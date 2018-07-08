import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from 'semantic-ui-react'; // Image,
import '../styles/Chatbox.css';

const BtnBubble = (props) => {
  const { options, btnWidth } = props;
  return (
    <div className="bub-fullwidth">
      <div className="bot-bubble">
        {options.map((item, i) => <p key={i}>{item}</p>)}
        {/* <Image className="bot-tail-left" src={BubTail} size="tiny" /> */}
        <Grid>
          <Grid.Row columns={options.length}>
             <Grid.Column>
               <Button primary>Primary</Button>
             </Grid.Column>
             {/* <Grid.Column>
               <Button secondary>Secondary</Button>
             </Grid.Column> */}
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

BtnBubble.propTypes = {
  options: PropTypes.array.isRequired,
  btnWidth: PropTypes.string
};

export default BtnBubble;
