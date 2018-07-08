import React from 'react';
import { Grid } from 'semantic-ui-react';
// import PropTypes from 'prop-types'
import "../styles/index.css";

const Footerlink = () => {
  return (
    <div className="footer-container">
      <Grid columns={4}>
        <Grid.Row>
          <Grid.Column>
            <a href="https://www.linkedin.com/" target="_blank" rel='noopener noreferrer' className="social-link">LinkedIn</a>
          </Grid.Column>
          <Grid.Column>
            <a href="https://dribbble.com/" target="_blank" rel='noopener noreferrer' className="social-link">Dribbble</a>
          </Grid.Column>
          <Grid.Column>
            <a href="https://medium.com/" target="_blank" rel='noopener noreferrer' className="social-link">Medium</a>
          </Grid.Column>
          <Grid.Column>
            <a href="https://www.instagram.com/?hl=en" target="_blank" rel='noopener noreferrer' className="social-link">Instagram</a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Footerlink;
