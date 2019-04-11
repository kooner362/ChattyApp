/* eslint-disable react/prop-types */
import React, {Component} from 'react';

class Message extends Component {
  constructor(props) {
    super(props);
  }

  checkImage(url) {
    let regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    if (url.match(regex) !== null) {
      return url.match(regex)[0];
    }
    return url.match(regex);
  }

  render() {
    let color = {color: 'black'};
    if (this.props.message.username['color']) {
      color.color = this.props.message.username['color'];
    }
    let content = this.props.message.content;
    let url = this.checkImage(content);
    let imgUrl = undefined;
    if (url !== null) {
      let regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
      imgUrl = url;
      content = content.replace(regex, '');
    }
    if (this.props.message.type == 'postMessage') {
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
          <div className="message">
              <span style={color} className="message-username">{this.props.message.username.name}</span>
              <span className="message-content">{content}</span>
          </div>
        );
      }
    } else {
      return (
        <div className="message system">{this.props.message.content}</div>
      );
    }
  }
}

export default Message;
