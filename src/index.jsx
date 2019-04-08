// Application entrypoint.

// Load up the application styles
require('../styles/application.scss');

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


ReactDOM.render(<div><App /> <MessageList/> <ChatBar /></div>, document.getElementById('react-root'));
