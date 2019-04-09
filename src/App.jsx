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
    this.state = {loading: true};
  }
  componentDidMount() {
    this.setState({loading: false, messages: data.messages, currentUser: data.currentUser})
  }

  render() {
    let currentUser = undefined;
    if (!this.state.loading) {
      currentUser = this.state.currentUser.name;
    }
    return (
      <Fragment>
        {NavBar()}
        <MessageList messages={this.state.messages}/> 
        <ChatBar currentUser= {currentUser}/>
      </Fragment>
    );
  }
}
export default App;
