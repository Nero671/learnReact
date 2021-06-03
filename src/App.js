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

  onChangeName = (name, index) => {
    const car = this.state.cars[index]
    car.name = name;

    const cars = [...this.state.cars]
    cars[index] = car;
    this.setState({ 
      cars
    }) 
  }

  togglesCarHandler = () => {
    this.setState({
      showCars: !this.state.showCars 
    })
  }

  deleteHandler(index) {
    const cars = this.state.cars.concat();
    
    cars.splice(index, 1)
    this.setState({cars})
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
                onDelete={this.deleteHandler.bind(this, index)}
                onChangeName={event => this.onChangeName(event.target.value, index)}
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
