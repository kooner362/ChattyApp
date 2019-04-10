import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        let text = event.target.value;
        let message = {username: this.props.currentUser, content: text};
        event.target.value = '';
        this.props.addMessage(message);
      }
    }

    const handleUser = (event) => {
      event.preventDefault();
      let text = event.target.value;
      this.props.updateUser(text);
    };

    return (
      <footer className="chatbar">
        <input name="user" onChange={handleUser} type="text" className="chatbar-username" value={this.props.currentUser} placeholder="Your Name (Optional)" />
        <input name="message" className="chatbar-message" onKeyDown={handleKeyDown} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;

