import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
    // Binding
    this.tick = this.onUpdateTime.bind(this);
  }

  // lifecycle hooks - “mounting”: Set up a timer whenever
  // the Clock is rendered to the DOM for the first time.
  componentDidMount() {
    this.timeID = setInterval(() => this.tick(), 1000);
  }

  // lifecycle hooks - “unmounting”: Clear that timer
  // whenever the DOM produced by the Clock is removed.
  componentWillUnmount() {
    clearInterval(this.timeID);
  }

  onUpdateTime() {
    this.setState({ // 更新state
      date: new Date()
    });
  }

  // 只用一个 checked={this.state.checked} or defaultChecked={this.state.checked}
  render() {
    return (
      <h4>It is {this.state.date.toLocaleTimeString()} now.</h4>
    );
  }
}

export default Clock;
