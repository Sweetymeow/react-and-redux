// @flow
// import React from 'react';
import * as React from 'react';

type Item = {
  feed: {
    title: string,
    description?: string,
    link: string
  }
};

class FlowSample extends React.Component<Item>{
  render() {
    return (
      <div className="row maketing">
        <div className="col-lg-12">
          <a href={this.props.feed.link}>
            <h4>{this.props.feed.title}</h4>
          </a>
          <p>{this.props.feed.description}</p>
        </div>
      </div>
    )
  }
}

export default FlowSample;
