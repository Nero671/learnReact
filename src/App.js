import React from 'react';
import './App.css';
import Car from './Car/Car';

class App extends React.Component {

  state = {
    cars: [
      {
        name: 'Ford',
        year: 2018
      },

      {
        name: 'BMW',
        year: 2020
      },

      {
        name: 'Mazda',
        year: 2015
      },
    ],
    pageTitle: 'React Components',
    showCars: false
  }

  changeTitleHandler = (newTitle) => {
    this.setState({
      pageTitle: newTitle 
    })
  }

  togglesCarHandler = () => {
    this.setState({
      showCars: !this.state.showCars 
    })
  }


  render() {
    const divStyle = {
      textAlign: 'center'
    } 

    return (
      <div style={divStyle}>
        <h1>{this.state.pageTitle}</h1>
        <button 
          onClick={this.togglesCarHandler}
        >Toggle cars</button>

        { this.state.showCars 
          ? this.state.cars.map((car, index) => {
            return(
              <Car 
                key={index}
                name={car.name}
                year={car.year}
                onChangeTitle={() => this.changeTitleHandler(car.name)}
              />
            )
          })  
          : null
        }

      </div>
    );
  }

}

export default App;
