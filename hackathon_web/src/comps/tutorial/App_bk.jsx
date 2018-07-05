import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import { Button } from 'semantic-ui-react';
import logo from './logo.svg';
import './App.css';
import Board from './noteboard/Board';
// import MenuHeader from './semanticUI/MenuHeader';
import TestComp from './tutorial/TestComp';

// const Clock = (props) => <h4>It is {props.date.toLocaleTimeString()} now.</h4>
const Home = () => (<div><h2>Home Page</h2></div> );

// class
class App extends Component {
  componentWillMount() { // load data before UI render
    firebase.initializeApp( {
      apiKey: 'AIzaSyDx2SbTs_Y4-wcJIDCdOmXp3AE5EG26Rws',
      authDomain: 'react-product-chart.firebaseapp.com',
      databaseURL: 'https://react-product-chart.firebaseio.com',
      projectId: 'react-product-chart',
      storageBucket: 'react-product-chart.appspot.com',
      messagingSenderId: '594004075004'
    } );
  }
  render() {
    return (
    <Router>
      <div className="App">
        {/* <MenuHeader /> */}
        <header className="App-header">
          <Link to="/">
            <img src={logo} className="App-logo" alt="logo"/>
          </Link>
          <span className="flex-spacer"/>
          <Button className="App-Header-Btn" content="Test" basic="basic" inverted="inverted" color="blue" as={Link} to="/test"/>
          <Button className="App-Header-Btn" content="noteBoard" basic="basic" inverted="inverted" color="blue" as={Link} to="/noteBoard"/>
        </header>
        <Route exact="exact" path="/" component={Home}/>
        <Route path="/test" render={() => ( <TestComp myName="Wendy" myAge={28}/> )}/>
        <Route path="/noteBoard" render={() => ( <Board count={10}/> )}/> {/* <TestComp myName="Wendy" myAge={28} /> */}
        {/* <Board count={10} /> */}
      </div>
    </Router>);
  }
}

export default App;
