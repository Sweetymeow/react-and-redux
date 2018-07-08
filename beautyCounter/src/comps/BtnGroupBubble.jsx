import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from 'semantic-ui-react'; // Image,
import '../styles/Chatbox.css';

const BtnGroupBubble = (props) => {
  const { options, btnWidth, label } = props;
  return (
    <div className="btn-container bub-60wid-center">
      {/* <Image className="bot-tail-left" src={BubTail} size="tiny" /> */}
      <p className="btn-group-label">{label}</p>
      <Grid className="btn-group">
        <Grid.Row centered columns={options.length}>
          {options.map(item => (
              <Grid.Column key={item.key} textAlign='center'>
                <Button primary>{item.text}</Button>
              </Grid.Column>))}
           {/* <Grid.Column>
             <Button secondary>Secondary</Button>
           </Grid.Column> */}
        </Grid.Row>
      </Grid>
    </div>
  );
};

BtnGroupBubble.propTypes = {
  options: PropTypes.array.isRequired,
  btnWidth: PropTypes.string,
  label: PropTypes.string
};

export default BtnGroupBubble;
