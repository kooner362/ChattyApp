import React, {Component, Fragment} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

function NavBar() {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span>help</span>
    </nav>);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: [], currentUser: 'Bob'};
    this.addMessage = this.addMessage.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.showUserChange = this.showUserChange.bind(this);
    this.ws = new WebSocket("ws://localhost:3001");
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.ws.onmessage = (event) => {
      let newMessage = JSON.parse(event.data);
      if (newMessage['clients'] !== undefined) {
        console.log(newMessage.clients)
      } else {
        if (newMessage.type === 'incomingMessage') {
          newMessage.type = 'postMessage';
          const newMessages = this.state.messages.concat(newMessage);
          this.setState({messages: newMessages})
        } else if (newMessage.type === 'incomingNotification') {
          newMessage.type = 'postNotification';
          const newMessages = this.state.messages.concat(newMessage);
          this.setState({messages: newMessages})
        } else {
          throw new Error('Unknown event type ' + newMessage.type);
        }
      }
    }
  }

  addMessage(message) {
    this.ws.send(JSON.stringify(message));
  }

  updateUser(name) {
    this.setState({currentUser: name});
  }

  showUserChange(message) {
    this.ws.send(JSON.stringify(message));
  }

  render() {
    return (
      <Fragment>
        {NavBar()}
        <MessageList messages={this.state.messages}/> 
        <ChatBar showUserChange={this.showUserChange} updateUser={this.updateUser} addMessage={this.addMessage} currentUser= {this.state.currentUser}/>
      </Fragment>
    );
  }
}
export default App;
