import React from 'react';
import './AnswerItem.css';

const AnswerItem = props => {

  const ans = ['AnswerItem'];

  if(props.state) {
    ans.push(props.state)
  }

  return (
    <li 
      className={ans.join(' ')}
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      { props.answer.text }
    </li>
  )

}

export default AnswerItem;