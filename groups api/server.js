const WebSocket = require("ws");
const express = require("express");
const app = express();
app.use(express.json());

const wss = new WebSocket.Server({ port: 3030 });

let currentConnectedNames = [];

wss.on("connection", ws => {
  wss.clients.forEach(distributeNamesToClient);

  ws.on("message", data => {
    const message = JSON.parse(data);
    console.log(message);

    switch (message.type) {
      case "addname":
        currentConnectedNames.push(message.payload);
        wss.clients.forEach(distributeNamesToClient);
        break;
      case "splitgroups":
        splitIntoGroups(message.payload);
        break;
      default:
        break;
    }
  });
});

function distributeNamesToClient(client) {
  if (client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(currentConnectedNames));
  }
}

function splitIntoGroups({ groupSize, numGroups }) {
  console.log(groupSize, numGroups);
}
