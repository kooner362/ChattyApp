/* eslint-disable react/prop-types */
import React, {Component, Fragment} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class NavBar extends Component {
  render () {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span>{this.props.clients} users online</span>
      </nav> 
      );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: [], currentUser: {name: 'Bob'}, clients: 0};
    this.addMessage = this.addMessage.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.showUserChange = this.showUserChange.bind(this);
    this.updateUserColor = this.updateUserColor.bind(this);
    this.ws = new WebSocket('ws://localhost:3001');
  }

  componentDidMount() {
    this.ws.onmessage = (event) => {
      let newMessage = JSON.parse(event.data);

      //sets value for users online
      if (newMessage['clients'] !== undefined) {
        this.setState({clients: newMessage.clients});
      } else {
        //Handles case for incomingMessage
        if (newMessage.type === 'incomingMessage') {
          newMessage.type = 'postMessage';
          if (this.state.currentUser['color'] === undefined) {
            this.updateUserColor(newMessage.username.color);
          }
          const newMessages = this.state.messages.concat(newMessage);
          this.setState({messages: newMessages});
          //Handles case for incomingNotification
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
    if (name === '') {
      name = 'Anon';
    }
    this.setState((prevState) => {
      return {currentUser: {name: name, color: prevState.currentUser.color}};
    });
  }

  showUserChange(message) {
    this.ws.send(JSON.stringify(message));
  }

  updateUserColor(color) {
    this.setState((prevState) => {
      return {currentUser: {name: prevState.currentUser.name, color: color}};
    });
  }

  render() {
    return (
      <Fragment>
        <NavBar clients={this.state.clients}/>
        <MessageList updateColor={this.updateUserColor} messages={this.state.messages}/> 
        <ChatBar showUserChange={this.showUserChange} updateUser={this.updateUser} addMessage={this.addMessage} currentUser= {this.state.currentUser}/>
      </Fragment>
    );
  }
}
export default App;
