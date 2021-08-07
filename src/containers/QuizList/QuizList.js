import React from 'react';
import './QuizList.css';
import { NavLink } from "react-router-dom";
import Loader from '../../Ui/Loader/Loader';
import axios from 'axios';

class QuizList extends React.Component {

  state = {
    quizes: [],
    loading: true,
  }

  renderQuizes() {
    return this.state.quizes.map(quiz => {
      return(
        <li
          key={quiz.id}
        >
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  async componentDidMount() {
    try{
      const response = await axios.get('https://react-quiz-e72e9-default-rtdb.firebaseio.com/quizes.json');
      const quizes = [];

      Object.keys(response.data).forEach((key, i) => {
        quizes.push({
          id: key,
          name: `Тест №${i + 1}`
        });
      });
      this.setState({quizes, loading: false});
    } catch(err) {
      console.log(err);
    }  
  }

  render() {
    return (
      <div className="QuizList">
        <h1>Список тестов</h1>

        {this.state.loading ? <Loader /> : 
          <ul>
            { this.renderQuizes() }
          </ul>
        }
      </div>
    )
  }
}

export default QuizList;