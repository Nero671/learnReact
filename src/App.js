import React from 'react';
import './App.css';
import Main from './Main/Main';
import MenuToggle from './Navigation/ComponentMenuToggle/MenuToggle';
import Drawer from './Navigation/Drawer/Drawer';

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
      <>
        <Drawer 
          isOpen={this.state.menu}
          onClose={this.menuCloseHandler}
        />
        <MenuToggle 
          onToggle={this.toggleMenuHandler} 
          isOpen={this.state.menu}
        />
        <Main />
      </>
    );
  }

}

export default App;
