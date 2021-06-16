import React from 'react';
import './FinishedQuize.css';
import Button from '../Ui/Button/Button'

const FinishedQuize = props => {

  const successCount = Object.keys(props.results).reduce((total, key) => {
    if(props.results[key] === 'success') {
      total++
    }

    return total
  }, 0)

  return (
    <div className="FinishedQuize">
      <ul>
        { props.quize.map((quizItem, index) => {

          const fn = [
            'fa',
            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            props.results[quizItem.id]
          ] 
          return (
            <li
              key={index}
            >
              <strong>{index + 1}</strong>.&nbsp;
              {quizItem.question}
              <i className={fn.join(' ')} />
            </li>
          )
        }) }

      </ul>
      <p>Правильно {successCount} из {props.quize.length}</p>
      <div>
        <Button onClick={props.onRetry} type="primary">Повторить</Button>
        <Button type="success">Перейти в список тестов</Button>
      </div>
    </div>
  )
}

export default FinishedQuize;