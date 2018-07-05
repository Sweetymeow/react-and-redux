import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.label = this.props.label;
    this.state = {
      checked: this.props.defaultStatus
    };
    // Binding
    this.handleCheck = this.onCheck.bind(this);
  }

  onCheck() {
    this.setState({
      checked: !this.state.checked
    });
  }
  // 只用一个 checked={this.state.checked} or defaultChecked={this.state.checked}
  render() {
    return (
      <div className="checkbox-container">
        <label htmlFor="test">
          {this.label}
          <input
            name="test"
            onChange={this.handleCheck}
            defaultChecked={this.state.checked}
            value={this.state.checked}
            type="checkbox"
          />
        </label>
        <p className="checkMsg">{this.state.checked ? 'Checked!!' : 'no checked'}</p>
      </div>
    );
  }
}

Checkbox.defaultProps = {
  label: 'Checkbox',
  defaultStatus: false
};

Checkbox.propTypes = {
  label: PropTypes.string,
  defaultStatus: PropTypes.bool
};

export default Checkbox;
