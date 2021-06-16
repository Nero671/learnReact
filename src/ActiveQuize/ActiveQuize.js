import React from 'react';
import './ActiveQuize.css';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuize = props => (
  <div className="ActiveQuize">
    <p className="Question">
      <span>
        <strong>{props.answerNumber}.</strong>&nbsp;
        {props.question}
      </span>
      <small>{props.answerNumber} из {props.quizeLength}</small>
    </p>

    <AnswersList 
      state={props.state}
      answers={props.answers}
      onAnswerClick={props.onAnswerClick}
    /> 
  </div>
)

export default ActiveQuize;