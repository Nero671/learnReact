import React from 'react';
import './App.css';
import Main from './containers/Main/Main';
import MenuToggle from './Navigation/ComponentMenuToggle/MenuToggle';
import Drawer from './Navigation/Drawer/Drawer';
import { BrowserRouter, Route } from "react-router-dom";
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';

class App extends React.Component {

  state = {
    menu: false
  }

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  menuCloseHandler = () => {
    this.setState({
      menu: false
    })
  }

  render() {

    return (
      <BrowserRouter>
        {/* <Route exact path=""></Route> */}
          <Drawer
            isOpen={this.state.menu}
            onClose={this.menuCloseHandler}
          />

          <Route path="/auth" component={Auth} />
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Main} />
          <Route exact path="/" component={QuizList} />

          <MenuToggle 
            onToggle={this.toggleMenuHandler} 
            isOpen={this.state.menu}
          />

          {/* <Main /> */}
      </BrowserRouter>
    );
  }

}

export default App;
