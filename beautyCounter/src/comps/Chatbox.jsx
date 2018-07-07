import React from 'react';
import { Divider, Image } from 'semantic-ui-react'
// import PropTypes from 'prop-types';
import '../styles/Chatbox.css';
import ImgBubble from './ImgBubble';
import TextBubble from './TextBubble';
import Gopher from '../res/Gopher.png';

const testText = "My name is Juan. && I am a UX/UI designer currently working at SAP. ";
const testText2 = "Thanks for your interest in my portfolio!&& May I ask your purpose of visiting today? :)";

class Chatbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      currentStep: 0
    };
  }

  render() {
    const textArr = testText.split("&&");
    const textArr2 = testText2.split("&&");
    return (
      <section className="chatbox-container">
        <h2>CHATBOX</h2>
        <ImgBubble imgSrc={Gopher}/>
        <TextBubble text={textArr} />
        <TextBubble text={textArr2} />
      </section>);
  }
}

export default Chatbox;
