import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let messageList = undefined;
    if (this.props.messages) {
      messageList = this.props.messages.map((message) => {
        return (<Message key={message.id} message={message}></Message>)
      });
    }
    
    return (
        <main className="messages">
            {messageList}
        </main>
    );
  }
}
export default MessageList;
