import React from 'react';
// import PropTypes from 'prop-types';
import '../styles/Chatbox.css';
import ImgBubble from './ImgBubble';
import TextBubble from './TextBubble';
import BtnGroupBubble from './BtnGroupBubble';
import PWInput from './PWInput';
import Gopher from '../res/Gopher.png';

const testText = "My name is Juan. && I am a UX/UI designer currently working at SAP. ";
const testText2 = "Thanks for your interest in my portfolio!&& May I ask your purpose of visiting today? :)";
const options = [{
  key: 1,
  text: "Recruiting designer",
  val: "RECRUITER"
}, {
  key: 2,
  text: "Just wander around",
  val: "VIEWER"
}];

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
        <ImgBubble imgSrc={Gopher}/>
        <TextBubble text={textArr} type="bot" />
        <TextBubble text={textArr2} type="user" />
        <BtnGroupBubble options={options} label="Choose an option" />
        <PWInput label="Type the Password" enableBack={true} />
      </section>);
  }
}

export default Chatbox;
