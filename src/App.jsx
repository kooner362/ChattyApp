import React, {Component, Fragment} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
}

function NavBar() {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: data.messages, currentUser: data.currentUser};
    this.addMessage = this.addMessage.bind(this);
    this.ws = new WebSocket("ws://localhost:3001");
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  addMessage(message) {
    this.ws.send(JSON.stringify(message));
    const newMessages = this.state.messages.concat(message);
    this.setState({messages: newMessages});
  }

  render() {
    const currentUser = this.state.currentUser.name;
    return (
      <Fragment>
        {NavBar()}
        <MessageList messages={this.state.messages}/> 
        <ChatBar addMessage={this.addMessage} currentUser= {currentUser}/>
      </Fragment>
    );
  }
}
export default App;
