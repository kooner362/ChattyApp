/* eslint-disable react/prop-types */
import React, {Component} from 'react';

class Message extends Component {
  constructor(props) {
    super(props);
  }
  
  /**
   * Checks whether there is a url in the message 
   * returns the url or null if not found
   * @param {*} message 
   */
  checkImage(message) {
    let regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    if (message.match(regex) !== null) {
      return message.match(regex)[0];
    }
    return message.match(regex);
  }

  render() {
    //Sets default color for username
    let color = {color: 'black'};
    if (this.props.message.username['color']) {
      color.color = this.props.message.username['color'];
    }
    //If there is an image url split the content from the url
    let content = this.props.message.content;
    let url = this.checkImage(content);
    let imgUrl = undefined;
    if (url !== null) {
      let regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
      imgUrl = url;
      content = content.replace(regex, '');
    }
    if (this.props.message.type == 'postMessage') {
      //Handle case for when the message has an image url
      if (imgUrl) {
        return (
          <div className="message">
            <span style={color} className="message-username">{this.props.message.username.name}</span>
            <div style={{flex: '8'}}>
              <p style={{paddingLeft: '0.25em'}} className="message-content">{content}</p>
              <img style={{'maxWidth': '60%'}} src={imgUrl}></img>
            </div>
          </div>
        );
      } else {
        return (
          //Handle case for messages with no image url
          <div className="message">
              <span style={color} className="message-username">{this.props.message.username.name}</span>
              <span className="message-content">{content}</span>
          </div>
        );
      }
    } else {
      return (
        //Notification
        <div className="message system">{this.props.message.content}</div>
      );
    }
  }
}

export default Message;
