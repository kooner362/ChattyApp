import React, {Component, Fragment} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

function NavBar() {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: [], currentUser: 'Bob'};
    this.addMessage = this.addMessage.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.ws = new WebSocket("ws://localhost:3001");
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.ws.onmessage = (event) => {
      let newMessage = JSON.parse(event.data);
      const newMessages = this.state.messages.concat(newMessage);
      this.setState({messages: newMessages})
    }
  }

  addMessage(message) {
    this.ws.send(JSON.stringify(message));
  }

  updateUser(name) {
    console.log(name);
    this.setState({currentUser: name});
  }

  render() {
    return (
      <Fragment>
        {NavBar()}
        <MessageList messages={this.state.messages}/> 
        <ChatBar updateUser={this.updateUser} addMessage={this.addMessage} currentUser= {this.state.currentUser}/>
      </Fragment>
    );
  }
}
export default App;
