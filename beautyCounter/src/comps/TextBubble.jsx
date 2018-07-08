import React from 'react'
import PropTypes from 'prop-types';
// import { Image } from 'semantic-ui-react';
import '../styles/Chatbox.css';

const TextBubble = (props) => {
  const { text, html, bubWidth, type } = props;
  return (
    <div className="bub-fullwidth">
      { type !== "user" ? (
        <div className="text-bubble left-bubble" >
            {text.map((item, i) => <p key={i}>{item}</p>)}
            {/* <Image className="bot-tail-left" src={BubTail} /> */}
        </div>) : (
        <div className="text-bubble right-bubble" >
          {text.map((item, i) => <p key={i}>{item}</p>)}
        </div>)
      }
    </div>
  );
};

TextBubble.propTypes = {
  text: PropTypes.array.isRequired,
  bubWidth: PropTypes.string,
  type: PropTypes.string,
  html: PropTypes.string
};

export default TextBubble;
