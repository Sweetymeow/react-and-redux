import React from 'react';
import PropTypes from 'prop-types';
import ReactImg from 'react-image';

const ImgBubble = (props) => {
  const { imgSrc, imgName } = props;
  return (
    <div className="imgbub-container">
       <img src={imgSrc} alt={imgName} />
      {/*<ReactImg src={imgSrc} />*/}
    </div>
  )
}
ImgBubble.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgName: PropTypes.string
};

export default ImgBubble;
