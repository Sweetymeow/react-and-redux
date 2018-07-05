import React from 'react';
import AnimeBackground from './comps/AnimeBackground';
import Chatbox from './comps/Chatbox';

const style = {
  margin: '20px'
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appTitle: "chatbot"
    };
  }

  render() {
    return (
      <section style={style} className="root-container">
        <Chatbox />
        <AnimeBackground />
      </section>
    );
  }
}

export default App;
