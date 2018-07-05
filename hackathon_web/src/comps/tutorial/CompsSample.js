import React, { Component } from 'react';
// import './App.css';

const Avatar = (av) => <img src="{av.user.avatarUrl}" alt="{av.user.name}" className="Avatar"/>;

const UserInfor = (ui) => {
  return (
    <div className="UserInfo">
      <Avatar user={ui.user} />
      {/* <img src="{props.author.avatarUrl}" alt="{props.author.name}" className="Avatar"/> */}
      <div className="UserInfo-name">{ui.user.name}</div>
    </div>
  )
}

// sample of Stateless function
const Comment = (props) => {
  return (
    <div className="Comment">
      <UserInfor user = {props.author} />
      <div className="Comment-text">{props.test}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}

// class
class CompsSample extends Component {
  render() {
    return (
      <div className="Comment">
        <div className="UserInfo">
          <img className="Avatar"
            src={props.author.avatarUrl}
            alt={props.author.name}
          />
          <div className="UserInfo-name">
            {props.author.name}
          </div>
        </div>
        <div className="Comment-text">
          {props.text}
        </div>
        <div className="Comment-date">
          {formatDate(props.date)}
        </div>
      </div>
    );
  }  // render
}

export default CompsSample;
