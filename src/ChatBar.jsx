import React, {Component} from 'react';
import { generateRandomId } from "./utils";

class ChatBar extends Component {
  render() {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        let text = event.target.value;
        let message = {id: generateRandomId(), username: this.props.currentUser, content: text};
        event.target.value = '';
        this.props.addMessage(message);
        
      }
    }
    return (
      <footer className="chatbar">
        <input type="text" className="chatbar-username" defaultValue={this.props.currentUser} placeholder="Your Name (Optional)" />
        <input name="message" className="chatbar-message" onKeyDown={handleKeyDown} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;

