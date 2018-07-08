import React from 'react';
import PropTypes from 'prop-types';
import { Image, Button } from 'semantic-ui-react'; // Image,
import '../styles/Chatbox.css';
import { downloadImg } from '../res/imgBundle';

const BtnBubble = (props) => {
  const { label, link } = props;
  return (
    <div className="btn-container bub-90wid-center">
      {/* <Image className="bot-tail-left" src={BubTail} size="tiny" /> */}
      <a href={link}>
        <Image src={downloadImg} size='tiny' />
      </a>
    </div>
  );
};

BtnBubble.propTypes = {
  options: PropTypes.array.isRequired,
  btnWidth: PropTypes.string,
  label: PropTypes.string
};

export default BtnBubble;
