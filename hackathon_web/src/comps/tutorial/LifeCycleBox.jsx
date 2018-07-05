import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class LifeCycleBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: '#29B6F6'
    };
    this.onUpdateBgColor = this.onUpdateBgColor.bind(this);
  }

  componentWillMount() {
    console.log('compoennt is about to mount - Before render()');
  }

  // lifecycle hooks - “mounting”: Set up a timer whenever
  // the Clock is rendered to the DOM for the first time.
  componentDidMount() {
    console.log('componentDidMount - After render()');
  }

  componentDidUpdate() {
    alert('@componentDidUpdate - After render()');
  }

  // lifecycle hooks - “unmounting”: Clear that timer
  // whenever the DOM produced by the Clock is removed.
  componentWillUnmount() {
  }

  onUpdateBgColor() {
    this.setState({ // 更新state
      background: '#FFCA28'
    });
  }

  render() {
    return (
      <div className="blueBox"
          style={this.state}
          onClick={this.onUpdateBgColor} />
    );
  }
}

// LifeCycleBox.propTypes = {
//   date: PropTypes.object.isRequired
// };

export default LifeCycleBox;
