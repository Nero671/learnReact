import React from 'react';
import './Drawer.css';
import BackDrop from '../../Ui/BackDrop/BackDrop';
import { NavLink } from "react-router-dom";


const links = [
  {
    to: '/',
    lable: 'Список',
    exact: true
  },
  {
    to: '/auth',
    lable: 'Авторизация',
    exact: false
  },
  {
    to: '/quiz-creator',
    lable: 'Создать опрос',
    exact: false
  }
]

class Drawer extends React.Component {

  clickHandler = () => {
    this.props.onClose();
  }

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName='active'
            onClick={this.clickHandler}
          >
            {link.lable}
          </NavLink>
        </li>
      )
    })
  }  

  render() {
    const cls = [
      'Drawer'
    ]

    if(!this.props.isOpen) {
      cls.push('close')
    } 
    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>
            { this.renderLinks() }
          </ul>
        </nav>
        { this.props.isOpen ? <BackDrop onClick={this.props.onClose} /> : null }
      </>
    )
  }
}

export default Drawer;
