import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Button, Label, Breadcrumb } from 'semantic-ui-react';
import './pages/AllPage.css';
import sections from '../data/sections.json';
import GetAPI from './API';

const getAPI = new GetAPI();
// const PageBreadcrumb = () => ( <Breadcrumb icon='right angle' sections={sections.overview}/> );
class RightHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionType: props.sectionType || sections.overview,
      getItemNumber: false,
      messageNum: 3,
      viewProps: {
        animation: 'scale down', // 'push',
        vertical: true,
        inverted: false,
        basicSeg: true
      }
    }
  }
  componentWillMount() {
    getAPI.testCreateMessage()
      .then(res => res)
      .then(createResult => {
        console.log(createResult);
        getAPI.getMQMessagePromise()
          .then(response => {
            console.log("Get messgae: ", response);
            this.setState({
              messageNum: response.message.length
            })
          }, error => {
            console.log(error);
          });
      })
  }
  componentWillReceiveProps(nextProps) {
    console.log("Breadcrumb - Item Number: ", this.props.itemNumber, nextProps.itemNumber);
    const newItemContent = `${this.state.sectionType[1].content} (${nextProps.itemNumber})`;
    if (nextProps.itemNumber && !this.state.getItemNumber) {
      this.setState({
        sectionType: [this.state.sectionType[0], { ...this.state.sectionType[1], content: newItemContent }],
        getItemNumber: true
      });
    }
  }
  render() {
    return (
      <Menu pointing={this.state.viewProps.pointing} secondary={this.state.viewProps.secondary} fluid={this.state.viewProps.fluid}>
          <Menu.Item>
            <Breadcrumb icon='right angle' sections={this.state.sectionType}/>
          </Menu.Item>
          {/* <Menu.Item><PageBreadcrumb/></Menu.Item> */}
          <Menu.Menu position="right">
            {/* <Menu.Item name="login" active={activeItem === 'login'} onClick={this.handleItemClick}/> */}
            <div className='ui right aligned category search item'>
              <div className='ui transparent icon input'>
                <input className='prompt' type='text' placeholder='Search...'/>
                <i className='search link icon'/>
              </div>
              <div className='results'/>
            </div>
            <Menu.Item>
              <Button as='div' labelPosition='right'>
                <Button color='red'>
                  <Icon name='alarm'/>
                </Button>
                <Label as='a' basic color='red' pointing='left'>{this.state.messageNum}</Label>
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
    );
  }
}

RightHeader.propTypes = {
  sectionType: PropTypes.array || [],
  itemNumber: PropTypes.number
};

export default RightHeader;
