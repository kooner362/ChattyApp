/* eslint-disable react/prop-types */
import React, {Component} from 'react';

class ChatBar extends Component {
  render() {

    /**
     * Handles event when user sends a message.
     * @param {*} event 
     */
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        let text = event.target.value;
        let message = {type: 'incomingMessage', username: this.props.currentUser, content: text};
        event.target.value = '';
        this.props.addMessage(message);
      }
    }

    /**
     * Handles event when user hits enter to change username
     * @param {*} event 
     */
    const handleKeyDownUser = (event) => {
      if (event.key === 'Enter') {
        let username = event.target.value;
        if (username === '') {
          username = 'Anon';
        }
        const text = `**${this.props.currentUser.name}** changed their name to **${username}**.`;
        this.props.updateUser(username);
        this.props.currentUser.name = username;
        let message = {type: 'incomingNotification', username: this.props.currentUser, content: text};
        this.props.showUserChange(message);
      }
    };

    /**
     * Handles event when user forgets to hit enter to change username
     * @param {*} event 
     */
    const blurHandler = (event) => {
      let username = event.target.value;
      if (username === '') {
        username = 'Anon';
      }
      if (username !== this.props.currentUser.name) {
        const text = `**${this.props.currentUser.name}** changed their name to **${username}**.`;
        this.props.updateUser(username);
        this.props.currentUser.name = username;
        let message = {type: 'incomingNotification', username: this.props.currentUser, content: text};
        this.props.showUserChange(message);
      }
    }

    return (
      <footer className="chatbar">
        <input name="user" onBlur={blurHandler} onKeyDown={handleKeyDownUser} type="text" className="chatbar-username" defaultValue={this.props.currentUser.name} placeholder="Your Name (Optional)" />
        <input name="message" className="chatbar-message" onKeyDown={handleKeyDown} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;

