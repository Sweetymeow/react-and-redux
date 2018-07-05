import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FaPlus from 'react-icons/lib/fa/plus';
import Note from './Note';
import noteData from '../../data/notes.json';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: noteData.notes
    };
    this.eachNote = this.eachNote.bind(this);
    this.update = this.update.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.addNote = this.addNote.bind(this);
  }
  // happen before render()
  componentWillMount() {
    // let self = this;
    if (this.props.count) {
      fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
        .then(response => response.json())
        .then(json => json[0].split('. ')
          .forEach(sentence => this.addNote(sentence.substring(0, 25))));
    }
  }

  // 作为props传递给子组件，用来接受子组件传递过来的newText
  update(newText, i) {
    console.log(`Update note #${i} with text: '${newText}'`);
    this.setState((prevState) => {
      return {
        notes: prevState.notes.map((note) => {
          return note.id === i ? { ...note, text: newText } : note;
        })
      }; // return
    });
  }

  // Handle add note from notes
  addNote(newText) {
    this.setState((prevState) => {
      const prevNotes = prevState.notes;
      console.log(`Add new note: ${newText}`);
      return {
        notes: [...prevState.notes,
          {
            id: prevNotes[prevNotes.length - 1].id + 1 || 0,
            text: newText
          }]
      };
    });
  }

  // Handle remove note from notes
  removeNote(id) {
    // Receive 'id' from sub-Component & change data of in state
    this.setState((prevState) => {
      return {
        notes: prevState.notes.filter((note) => note.id !== id)
      };
    });
  }

  // Create instance of sub-Component based on state.notes
  eachNote( note, i ) {
    return (<Note key={i}
                  index={i}
                  id={note.id}
                  onChange={this.update}
                  onRemove={this.removeNote}>
                  {note.text}
            </Note>);
  }


  // A .bind() call or arrow function in a JSX prop will
  // create a brand new function on every single render.
  render() {
    return (<div className="board">
              {this.state.notes.map(this.eachNote)}
              <button className="addButton"
                  onClick={(e) => this.addNote('New Note', e)}
                  id="addButton"><FaPlus />
              </button>
            </div>);
  }
  // onClick={this.addNote.bind(null, 'New Note')}
  // 上面的写法必须用bind，不然会进入不限循环
}

Board.propTypes = {
  count: PropTypes.number
};

export default Board;
