import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrash from 'react-icons/lib/fa/trash';
import FaFloppyO from 'react-icons/lib/fa/floppy-o';
// If you are not using es6 compiler like babel or rollup.js,

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      randomStyle: true
    };

    // interactive function
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
    // calculate function
    this.randomBetween = this.randomBetween.bind(this);
  }

  // Generate random number
  randomBetween(x, y, s) {
    return x + Math.ceil(Math.random() * (y - x)) + s;
  }

  // lifecycle function
  componentWillMount() {
    this.style = {
      right: this.randomBetween(0, window.innerWidth - 150, 'px'),
      top: this.randomBetween(0, window.innerHeight - 150, 'px'),
      transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`,
      position: 'absolute'
    };
  }

  // Display Mode: Handle "Edit" & "Remove" button
  edit() {
    console.log(`Edit - state.editing: ${this.state.editing}`);
    // this._newText.focus();
    this.setState({
      editing: true
    });
  }

  remove() {
    this.props.onRemove(this.props.id);
  }

  // Editing Mode: Handle "save" button
  save(e) {
    e.preventDefault();
    // call update(newText, i) from Board
    this.props.onChange(this._newText.value, this.props.id);
    this.setState({
      editing: false
    });
  }

  // note in edit mode(save button)
  renderForm() {
    return (
    <div className="note-container" style={this.state.randomStyle ? this.style : {}}>
      <div className="note">
        <form onSubmit={this.save}>
          <textarea ref={(input) => { this._newText = input; }} />
          <span className="buttons">
            {/* <button onClick={this.save} id="edit"><FaFloppyO /></button> */}
            <button> <FaFloppyO /></button>
          </span>
        </form>
      </div>
    </div>);
  }

  // note in display mode(edit & remove button)
  renderDisplay() {
    return (
    <div className="note" style={this.state.randomStyle ? this.style : {}}>
      <span>
        <p>{this.props.children}</p>
      </span>
      <span className="buttons">
        <button onClick={this.edit} id="edit"> <FaPencil /></button>
        <button onClick={this.remove} id="remove"> <FaTrash /></button>
      </span>
    </div>);
  }

  render() {
    return this.state.editing ? this.renderForm() : this.renderDisplay();
  }
}

Note.propTypes = {
  children: PropTypes.string,
  // index: PropTypes.number,
  id: PropTypes.number,
  onChange: PropTypes.func,
  onRemove: PropTypes.func
};

export default Note;
