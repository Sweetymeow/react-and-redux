import React from 'react';
import { Grid } from 'semantic-ui-react';
// import PropTypes from 'prop-types'
import "../styles/AnimeBackground.css";

const Footerlink = () => {
  return (
    <div className="footer-container">
      <Grid columns={4}>
        <Grid.Row>
          <Grid.Column>
            <a href="https://www.linkedin.com/" target="_blank" className="social-link">LinkedIn</a>
          </Grid.Column>
          <Grid.Column>
            <a href="#" target="_blank" className="social-link">Dribbble</a>
          </Grid.Column>
          <Grid.Column>
            <a href="#" target="_blank" className="social-link">Medium</a>
          </Grid.Column>
          <Grid.Column>
            <a href="#" className="social-link">Instagram</a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Footerlink;
