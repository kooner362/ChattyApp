const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuid = require('uuid/v1');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
let clients = 0; //Keeps track of connected clients
const colors = ['red', 'green', 'purple', 'blue']; //colors for usernames

/**
 * Randomly returns a color from folors array
 */
const assignColor = () => {
  const randInt = Math.floor(Math.random() * 4);
  return colors[randInt];
}
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  clients++;
  //Send broadcast to update users online
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({clients: clients}));
    }
  });

  ws.on('message', (data) => {
    let message = JSON.parse(data);
    //Assign color to user if they dont already have one
    if (message.username['color'] === undefined && message.type === 'incomingMessage') {
      message.username['color'] = assignColor();
    }
    message['id'] = uuid();

    //Broadcast message back to all connected clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
      }
    });
  });
  
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    //Broadcast to all connected clients to update users online
    clients--;
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({clients: clients}));
      }
    });
  });
});