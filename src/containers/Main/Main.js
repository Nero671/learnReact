import React from 'react';
import './Main.css';
import ActiveQuize from '../../ActiveQuize/ActiveQuize';
import FinishedQuize from '../../FinishedQuize/FinishedQuize';


class Main extends React.Component {

  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quize: [
      {
        question: 'Какого цвета небо?',
        rightAnswerId: 2, 
        id: 1,
        answers: [
          {
            text: 'Черный',
            id: 1
          },
          {
            text: 'Синий',
            id: 2
          },
          {
            text: 'Крассный',
            id: 3
          },
          {
            text: 'Зеленый',
            id: 4
          }
        ]
      },
      {
        question: 'В каком году основали Минск?',
        rightAnswerId: 3, 
        id: 2,
        answers: [
          {
            text: '1400',
            id: 1
          },
          {
            text: '949',
            id: 2
          },
          {
            text: '1067',
            id: 3
          },
          {
            text: '1323',
            id: 4
          }
        ]
      }
    ]
  }

  onAnswerClickHandler = (answerId) => {

    if(this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if(this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quize[this.state.activeQuestion];
    const results = this.state.results

    if(question.rightAnswerId === answerId) {

      if(!results[question.id]) {
        results[question.id] = 'success'
      }

      this.setState({
        answerState: {[answerId]: 'success'}, 
        results
      })

      setTimeout(() => {
        if(this.isQuizeFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1, 
            answerState: null
          })
        }
        clearTimeout();
      }, 1000)

    } else {
      results[question.id] = 'error';

      this.setState({
        answerState: {[answerId]: 'error'},
        results
      })
    }
  
    
  }

  isQuizeFinished() {
    return this.state.activeQuestion + 1 === this.state.quize.length;
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  


  render() {
    return (
      <main className="main">
        <div className="QuizWrapper">
          <h1>Ответьте на все вопросы</h1>
          { 
            this.state.isFinished ?
              <FinishedQuize 
                results={this.state.results}
                quize={this.state.quize}
                onRetry={this.retryHandler}
              /> :
                <ActiveQuize
                  answers={this.state.quize[this.state.activeQuestion].answers}
                  question = {this.state.quize[this.state.activeQuestion].question}
                  onAnswerClick = {this.onAnswerClickHandler}
                  quizeLength = {this.state.quize.length}
                  answerNumber = {this.state.activeQuestion + 1}
                  state={this.state.answerState}
                />
          }
        </div>
      </main>
    )
  }
  
}

export default Main;