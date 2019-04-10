/* eslint-disable react/prop-types */
import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        let text = event.target.value;
        let message = {type: 'incomingMessage', username: this.props.currentUser, content: text};
        event.target.value = '';
        this.props.addMessage(message);
      }
    }

    /**Is this necessary? required of onChange on username field */
    const handleUser = (event) => {
      let text = event.target.value;
      this.props.updateUser(text);
    };

    const handleKeyDownUser = (event) => {
      if (event.key === 'Enter') {
        let username = event.target.value;
        let text = `**${this.props.currentUser}** changed their name to **${username}**.`;
        this.props.updateUser(username);
        let message = {type: 'incomingNotification', username: username, content: text};
        this.props.showUserChange(message);
      }
    };

    return (
      <footer className="chatbar">
        <input name="user" onKeyDown={handleKeyDownUser} type="text" className="chatbar-username" defaultValue={this.props.currentUser} placeholder="Your Name (Optional)" />
        <input name="message" className="chatbar-message" onKeyDown={handleKeyDown} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;

