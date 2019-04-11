import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messageList = this.props.messages.map((message) => {
      return (<Message updateColor={this.props.updateColor} key={message.id} message={message}></Message>)
    });
    
    return (
      <main className="messages">
        {messageList}
      </main>
    );
  }
}
export default MessageList;
