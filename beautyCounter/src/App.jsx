import React from 'react';
import AnimeBackground from './comps/AnimeBackground';
import Chatbox from './comps/Chatbox';
import Footerlink from './comps/Footerlink';

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
        <Footerlink />
      </section>
    );
  }
}

export default App;
