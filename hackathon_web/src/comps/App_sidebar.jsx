import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, } from 'react-router-dom';
import {
  Menu,
  Breadcrumb,
  Sidebar,
  Segment,
  Button,
  Image,
  Icon,
  Header
} from 'semantic-ui-react';
import logo from './logo.svg';
import './App.css';
// import Board from './noteboard/Board';
import AllPage from './pages/AllPage';
import CorePage from './pages/CorePage';
import IndividualPage from './pages/IndividualPage';

const sections = [
  {
    key: 'Forecast',
    content: 'Forecast',
    link: true,
  }, {
    key: 'Item',
    content: 'item list(20)',
    link: true,
  },
]

const PageBreadcrumb = () => ( <Breadcrumb icon='right angle' sections={sections}/> );

// class
class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      activeItem: '/',
      feed: null,
      visible: true,
      viewProps: {
        animation: 'scale down', // 'push',
        vertical: true,
        inverted: false,
        basicSeg: true
      }
    };
    this.handleItemClick = this.handleItemClick.bind( this );
    this.toggleVisibility = this.toggleVisibility.bind( this );
  }

  componentWillMount() { // load data before UI render
  }

  handleItemClick( e, { name } ) {
    e.preventDefault();
    console.log( name );
    this.setState( { activeItem: name } );
  }

  toggleVisibility() {
    this.setState( {
      visible: !this.state.visible
    } );
  }

  render() {
    const { activeItem } = this.state;
    console.log( this.state.feed );
    return ( <Router>
      <div className="App">
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu}
              animation={this.state.viewProps.animation}
              width='thin'
              visible={this.state.visible}
              icon='labeled'
              vertical={this.state.viewProps.vertical}
              inverted={this.state.viewProps.inverted}>
            <Menu.Item onClick={this.toggleVisibility}>
              <img src={logo} className="App-logo" alt="logo"/>
              John Dow
            </Menu.Item>
            <Menu.Item name="All" as={Link} to="/">
              <Icon name='home'/>All
            </Menu.Item>
            <Menu.Item name="Core" as={Link} to="/core">
              <Icon name='lightbulb'/>Core
            </Menu.Item>
            <Menu.Item name="Individual" as={Link} to="/individual">
              <Icon name='list'/>Individual Items
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment className="mainContainer" basic={this.state.viewProps.basicSeg}>
              <Menu pointing secondary fluid>
                  <Menu.Item>
                    <PageBreadcrumb/>
                  </Menu.Item>

                  <Menu.Menu position="right">
                    <Menu.Item name="login" active={activeItem === 'login'} onClick={this.handleItemClick}/>
                  </Menu.Menu>
              </Menu>
              <Route exact path="/" component={AllPage}/>
              <Route path="/core" render={() => ( <CorePage myName="Wendy" myAge={28}/> )}/>
              <Route path="/individual" render={() => ( <IndividualPage salesData={this.state.feed}/> )}/>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>

        {/* <Menu pointing="pointing" secondary="secondary">
          <Menu.Item><PageBreadcrumb/></Menu.Item>

          <Menu.Item onClick={this.toggleVisibility}>
            <img src={logo} className="App-logo" alt="logo"/>
          </Menu.Item>
          <Menu.Item name="All" as={Link} to="/"/>
          <Menu.Item name="Core" as={Link} to="/core"/>
          <Menu.Item name="Individual" as={Link} to="/individual"/>
          <Menu.Menu position="right">
            <Menu.Item name="login" active={activeItem === 'login'} onClick={this.handleItemClick}/>
          </Menu.Menu>
        </Menu> */}

        {/* <Route path="/noteBoard" render={() => ( <Board count={10} /> )} /> */}
      </div>
    </Router> );
  }
}

export default App;
