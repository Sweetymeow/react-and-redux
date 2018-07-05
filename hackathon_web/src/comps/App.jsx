import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { Menu, Grid, Header, Image, Icon } from 'semantic-ui-react';
// import user from './logo.svg';
import user from './user.png';
import './App.css';
// import Board from './noteboard/Board';
import AllPage from './pages/AllPage';
import CorePage from './pages/CorePage';
import IndividualPage from './pages/IndividualPage';

// class
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: '/',
      feed: null,
      visible: true,
      viewProps: {
        animation: 'scale down', // 'push',
        vertical: true,
        inverted: false,
        basicSeg: true
      },
      linkActStyle: {
        fontWeight: 'bold',
        color: 'teal !important',
        background: '#FFF !important'
      } // color not work
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  componentWillMount() { // load data before UI render
  }

  handleItemClick(e, {name}) {
    e.preventDefault();
    console.log(name);
    this.setState({activeItem: name});
  }

  toggleVisibility() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    // const { activeItem } = this.state;
    return (
    <Router>
      <div className="App">
        <Grid className="fullHeight sideBar">
          <Grid.Row divided className="noPadding">
            <Grid.Column width={2} className="noPadding tealBg" inverted="true">
              <Menu vertical={this.state.viewProps.vertical} fluid color="teal" inverted>
                <Menu.Item onClick={this.toggleVisibility}>
                  {/* <img src={logo} className="App-logo" alt="logo" size="tiny"/>
                  John Dow */}
                  <Header as="h4" inverted>
                    <Image circular src={user} />
                    <Header.Content > John Dow
                      <Icon name='angle down' size='small' />
                      <Header.Subheader> #148 manager </Header.Subheader>
                    </Header.Content>
                  </Header>
                </Menu.Item>
                <Menu.Item className="sideBarLink" name="Overview" as={NavLink} to="/" exact activeStyle={this.state.linkActStyle}>Overview</Menu.Item>
                <Menu.Item className="sideBarLink" name="Core" as={NavLink} to="/core" activeStyle={this.state.linkActStyle}>Core Items</Menu.Item>
                <Menu.Item className="sideBarLink" name="Individual" as={NavLink} to="/individual" activeStyle={this.state.linkActStyle}>Items List(20)</Menu.Item>
              </Menu>
            </Grid.Column>

            <Grid.Column width={14} className="noPadding">
              <Route exact path="/" component={AllPage}/>
              <Route path="/core" render={() => (<CorePage myName="Wendy" myAge={28}/>)}/>
              <Route path="/individual" render={() => (<IndividualPage salesData={this.state.feed}/>)}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {/* <Route path="/noteBoard" render={() => ( <Board count={10} /> )} /> */}
      </div>
    </Router>);
  }
}

export default App;
