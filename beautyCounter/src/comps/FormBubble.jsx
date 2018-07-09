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
      inputRef: null,
      password: ""
    };
    this.handleRef = this.handleRef.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRef(c) {
    this.state.inputRef = c;
  }

  handlePWChange(event) {
    // console.log(event.target.value);
    this.setState({
      password: event.target.value
    })
  }

  handleSubmit() {
    console.log(`PW: ${this.state.password}`);
  }

  render() {
    const { label, enableBack } = this.props;
    const { password } = this.state;
    return (
      <section className="input-container bub-60wid-center">
        <Grid className="input-header">
          <Grid.Row centered columns={3}>
            <Grid.Column width={3} />
            <Grid.Column className="back-button" width={3}>
              {enableBack ? (<a href="http://localhost:3000/"><Icon name='arrow left' /> BACK</a>)
                : null}
            </Grid.Column>
            <Grid.Column width={10}>
                <p className="input-label">{label}</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <form className="input-action">
            {/* <Input className="input-field" icon={{ name: 'arrow right', circular: true, link: true}}
             type="password" ref={this.handleRef} size="big" focus placeholder="Password..."
             value={password} onChange={this.handlePWChange} /> */}
           <Input icon className="input-field" ref={this.handleRef} size="big" focus placeholder="Password...">
             <input type="password" onChange={this.handlePWChange} value={password} />
             <Icon circular inverted color="teal" name="arrow right" link onClick={this.handleSubmit} />
           </Input>
           <p className="input-email-link">
             <a href="http://localhost:3000/">Request the Password</a>
           </p>
        </form>
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
