import React from 'react';
import './App.css';
import Car from './Car/Car';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import Counter from './Counter/Counter';

export const ClickedContext = React.createContext(false)

class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      clicked: false,
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

  componentWillMount() {
    console.log('App: componentWillMount');
  }

  componentDidMount() {
    console.log('App: componentDidMount');
  }


  render() {
    console.log('App: render');
    const divStyle = {
      textAlign: 'center'
    } 

    return (
      <div style={divStyle}>
        {/* <h1>{this.state.pageTitle}</h1> */}
        <h1>{this.props.title}</h1>
        <ClickedContext.Provider value={this.state.clicked}>
          <Counter />
        </ClickedContext.Provider>
        
        <button 
          onClick={this.togglesCarHandler}
        >Toggle cars</button>

        <button onClick={() => this.setState({clucked: true})}>Change clicked</button>

        { this.state.showCars 
          ? this.state.cars.map((car, index) => {
            return(
              <div style={{
                width: 400,
                margin: 'auto',
                paddingTop: 20
              }}>
                <ErrorBoundary key={index}>
                  <Car 
                    name={car.name}
                    year={car.year}
                    index={index}
                    onDelete={this.deleteHandler.bind(this, index)}
                    onChangeName={event => this.onChangeName(event.target.value, index)}
                  />
                </ErrorBoundary>
              </div>
            )
          })  
          : null
        }

      </div>
    );
  }

}

export default App;
