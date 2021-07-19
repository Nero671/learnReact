import React from 'react';
import './QuizList.css';
import { NavLink } from "react-router-dom";

class QuizList extends React.Component {

  renderQuizes() {
    return [1, 2, 3].map((quiz, index) => {
      return(
        <li
          key={index}
        >
          <NavLink to={'/quiz/' + quiz}>
            Тест {quiz}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    return (
      <div className="QuizList">
        <h1>Hello QuizList</h1>
        <ul>
          { this.renderQuizes() }
        </ul>
      </div>
    )
  }
}

export default QuizList;