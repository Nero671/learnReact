import React from 'react';
import './Main.css';
import ActiveQuize from '../../ActiveQuize/ActiveQuize';
import FinishedQuize from '../../FinishedQuize/FinishedQuize';
import axios from 'axios';
import Loader from '../../Ui/Loader/Loader';


class Main extends React.Component {

  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quize: [],
    loading: true
  }

  onAnswerClickHandler = answerId => {

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

  async componentDidMount() {
    try{
      const response = await axios.get(`https://react-quiz-e72e9-default-rtdb.firebaseio.com/quizes/${this.props.match.params.id}.json`);
      const quize = response.data;

      this.setState({
        quize,
        loading: false
      });

    } catch(err) {
      console.log(err);
    } 
  }


  render() {
    return (
      <main className="main">
        <div className="QuizWrapper">
          <h1>Ответьте на все вопросы</h1>

          {
          this.state.loading 
            ? <Loader/> 
              :  
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