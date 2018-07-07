import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

const ImgBubble = (props) => {
  const { imgSrc, imgName } = props;
  return (
    <div className="imgbub-container bub-fullwidth">
       {/* <img src={imgSrc} alt={imgName} /> */}
       <Image className="left-bubble" src={imgSrc} size="tiny" avatar={imgName} />
    </div>
  );
}
ImgBubble.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgName: PropTypes.string
};

export default ImgBubble;
