/* eslint-disable react/prop-types */
import React, {Component} from 'react';

class Message extends Component {
  render() {
    let color = {color: 'black'};
    if (this.props.message.username['color']) {
      color.color = this.props.message.username['color'];
    }
    if (this.props.message.type == 'postMessage') {
      return (
        <div className="message">
            <span style={color} className="message-username">{this.props.message.username.name}</span>
            <span className="message-content">{this.props.message.content}</span>
        </div>
      );
    } else {
      return (
        <div className="message system">{this.props.message.content}</div>
      );
    }
    
  }
}

export default Message;
