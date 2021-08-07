import React from 'react';
import './Auth.css';
import Button from '../../Ui/Button/Button';
import Input from '../../Ui/Input/Input';
import is from 'is_js';
import axios from 'axios';

class Auth extends React.Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value, 
      password: this.state.formControls.password.value, 
      returnSecureToken: true
    }
    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBcFuQjCTcxOM4byb3Yij-FmYMKhvQGhZA', authData);
      console.log(response.data);
    } catch(err) {
      console.log(err);
    }
  }

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value, 
      password: this.state.formControls.password.value, 
      returnSecureToken: true
    }
    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcFuQjCTcxOM4byb3Yij-FmYMKhvQGhZA', authData);
      console.log(response.data);
    } catch(err) {
      console.log(err);
    }
  }

  submitHandler = e => {
    e.preventDefault();
  }

  validateControl(value, validation) {
    if(!validation) {
      return true
    }

    let isValid = true;

    if(validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if(validation.email) {
      isValid = is.email(value) && isValid;
    }

    if(validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid
  }

  onChangeHandler = (e, controlName) => {
    console.log(`${controlName}: `, e.target.value);

    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName]}

    control.value = e.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid;
    })

    this.setState({
      formControls,
      isFormValid,
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input 
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={e => this.onChangeHandler(e, controlName)}
        />
      )
    })
  }



  render() {



    return (
      <div className="Auth">
        <div>
          <h1>Авторизация</h1>

          <form onSubmit={this.submitHandler} className="AuthForm">

            { this.renderInputs() }

            <Button type="success" onClick={this.loginHandler} disabled={!this.state.isFormValid}>Войти</Button>
            <Button type="primary" onClick={this.registerHandler} disabled={!this.state.isFormValid}>Зарегистрироваться</Button>
          </form>
        </div>
      </div>
    )
  }
}

export default Auth; 