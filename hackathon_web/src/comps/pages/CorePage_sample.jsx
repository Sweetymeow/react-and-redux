import React from 'react';
import PropTypes from 'prop-types';
import Clock from '../tutorial/Clock';

// sample of Stateless function
const PropText = (props) => <p>{ props.newName } is here in props</p>;
const PropTextV2 = ({ nickName }) => <p>{ nickName } is here in props using another syntax</p>;

class CorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: {
        title: "Atom-React Guilde",
        description: "React support for the Atom Editor.",
        link: "http://orktes.github.io/atom-react/"
      }
    };
  }
  render() {
    return (
      <div className="testComp">
        {/* <FlowSample feed={this.state.feed}/> */}
        <h3>I&apos;m {this.props.myName}, and {this.props.myAge}-years-old</h3>
        <PropText newName="WEN" />
        <PropTextV2 nickName="Sweety" />
        <Clock date={new Date()} />
        {/* <Checkbox label="Checkbox 1:" defaultStatus={true} /> */}
      </div>
    );
  }
}

CorePage.propTypes = {
  myName: PropTypes.string,
  myAge: PropTypes.number
};

PropText.propTypes = {
  newName: PropTypes.string
};
PropTextV2.propTypes = {
  nickName: PropTypes.string
};

export default CorePage;
