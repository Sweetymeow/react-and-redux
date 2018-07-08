import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Icon, Input } from 'semantic-ui-react'; // Image,
import '../styles/Chatbox.css';

const backBtn = () => (<Button className="borderless-btn" basic compact color="teal">
  <Icon name='arrow left' /> BACK
</Button>);

class FormBubble extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "basic",
      inputRef: null
    };
    this.handleRef = this.handleRef.bind(this);
  }

  handleRef(c) {
    this.state.inputRef = c;
  }

  render() {
    const { label, enableBack } = this.props;
    return (
      <section className="input-container bub-60wid-center">
        <Grid className="input-header">
          <Grid.Row centered columns={3}>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column className="back-button" width={3}>
              {enableBack ? (<a href=""><Icon name='arrow left' /> BACK</a>)
                : null}
            </Grid.Column>
            <Grid.Column width={10}>
                <p className="input-label">{label}</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className="input-action">
           <Input className="input-field" type="password" ref={this.handleRef} size='big' focus placeholder='Password...' />
           <p className="input-email-link"><a href="#">Request the Password</a></p>
        </div>
      </section>
    );
  }
}


FormBubble.propTypes = {
  // options: PropTypes.array.isRequired,
  enableBack: PropTypes.bool,
  label: PropTypes.string
};

export default FormBubble;
