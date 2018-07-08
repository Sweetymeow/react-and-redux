import React from 'react'
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import '../styles/Chatbox.css';
import BubTail from '../res/bubble_tail.svg';

const TextBubble = (props) => {
  const { text, html, bubWidth } = props;
  return (
    <div className="bub-fullwidth">
      <div className="bot-bubble left-bubble" >
        {text.map((item, i) => <p key={i}>{item}</p>)}
        <Image className="bot-tail-left" src={BubTail} />
        {/* <Divider hidden /> */}
      </div>
    </div>
  );
};

TextBubble.propTypes = {
  text: PropTypes.array.isRequired,
  bubWidth: PropTypes.string,
  html: PropTypes.string
};

export default TextBubble;
