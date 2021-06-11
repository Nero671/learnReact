import React from 'react';
import PropTypes from 'prop-types';
import './Car.css';

class Car extends React.Component {

  constructor(props) {
    super(props);

    this.inputRef = React.createRef()
  }

  componentDidMount() {
    if(this.props.index === 0) {
      this.inputRef.current.focus();
    }
  }


  render() {
    console.log('car render');
    const inputClasses = ['input'];

    if(this.props.name) {
      inputClasses.push('green')
    } else {
      inputClasses.push('red')
    }

    if(this.props.name.length > 4) {
      inputClasses.push('bold')
    }


    return(
      <div className="Car">
        <h3>Car name: {this.props.name}</h3>
        <p>Year: <strong>{this.props.year}</strong></p>
        <input 
          ref={this.inputRef}
          type="text" 
          value={this.props.name} 
          onChange={this.props.onChangeName} 
          className={inputClasses.join(' ')}
        />
        <button onClick={this.props.onDelete}>Delete</button>
      </div>
    )
  }
}

Car.propTypes = {
  name: PropTypes.string,
  year: PropTypes.number,
  onChangeName: PropTypes.func,
  index: PropTypes.number,
  onDelete: PropTypes.func
}



export default Car;