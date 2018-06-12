import React from 'react';
import logo from './logo.svg';
// import SemUI from './components/SemUI';
import FoodBasket from './components/FoodBasket';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <FoodBasket />
    </div>
  );
};

{/*
  class App extends Component {
      render() {
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <FoodBasket />
          </div>
        );
      }
      }
*/}

export default App;
