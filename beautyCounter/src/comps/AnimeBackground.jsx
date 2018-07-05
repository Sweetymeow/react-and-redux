import React from 'react'
import PropTypes from 'prop-types';
import { bgc1, bgc2, bgc3, bgc4, bgc5, bgc6, bgc7, bgc8, bgc9, bgc10 } from '../res/imgBundle';

const AnimeBackground = (props) => {
  return (
    <section className="animeBg">
      <img src={bgc1} alt="background column 1"/>
      <img src={bgc2} alt="background column 2"/>
      <img src={bgc3} alt="background column 3"/>
      <img src={bgc4} alt="background column 4"/>
      <img src={bgc5} alt="background column 5"/>
      <img src={bgc6} alt="background column 6"/>
      <img src={bgc7} alt="background column 7"/>
      <img src={bgc8} alt="background column 8"/>
      <img src={bgc9} alt="background column 9"/>
      <img src={bgc10} alt="background column 10"/>
    </section>
  )
}

export default AnimeBackground;
