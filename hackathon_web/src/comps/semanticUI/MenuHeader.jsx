import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'; // Segment
import { BrowserRouter as Router, Link } from 'react-router-dom';

class MenuHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home'
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    e.preventDefault();
    console.log(name);
    this.setState({
      activeItem: name
    });
    // return (e, { name }) => this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Router>
        <Menu pointing secondary>
          <Menu.Item name='home'
            as={Link}
            to='/home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick} />
          <Menu.Item
            name='Test'
            as={Link}
            to='/test'
            active={activeItem === 'test'}
            onClick={this.handleItemClick} />
          <Menu.Item
            name='NoteBoard'
            as={Link}
            to='/noteBoard'
            active={activeItem === 'noteBoard'}
            onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
          </Menu.Menu>
        </Menu>

        {/* <Segment>
          <img src='/assets/images/wireframe/media-paragraph.png' />
        </Segment> */}
      </Router>
    );
  }
}

export default MenuHeader;
