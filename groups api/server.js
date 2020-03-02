const WebSocket = require("ws");
const express = require("express");
const app = express();
app.use(express.json());

const wss = new WebSocket.Server({ port: 3030 });

let currentConnectedNames = [];
let connectedSockets = [];

class Clients {
  constructor() {
    this.clientList = {};
    this.saveClient = this.saveClient.bind(this);
  }
  saveClient(username, client) {
    this.clientList[username] = client;
  }
}

let clients = new Clients();

wss.on("connection", ws => {
  wss.clients.forEach(distributeNamesToClient);

  ws.on("message", data => {
    const message = JSON.parse(data);
    console.log(message);

    switch (message.type) {
      case "addname":
        let socket = {
          socket: ws,
          name: message.payload
        };
        connectedSockets.push(socket); //remove
        clients.saveClient(message.payload, ws);
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
  let message = {
    type: "namearray",
    payload: currentConnectedNames
  };
  if (client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(message));
  }
}

function splitIntoGroups({ groupSize, numGroups }) {
  let shuffledNames = shuffle(currentConnectedNames);
  const splitNames = split(shuffledNames, groupSize, numGroups);
  distributeGroups(splitNames);
  resetNamesAndSockets();
}

function resetNamesAndSockets() {
  currentConnectedNames = [];
  connectedSockets = [];
  clients = new Clients();
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function split(namesArray, groupSize, numGroups) {
  let a = [];
  namesArray.map((name, index) => {
    if (index % groupSize === 0) {
      a.push([name]);
    } else {
      a[a.length - 1].push(name);
    }
  });
  return a;
}

function distributeGroups(groupedNames) {
  groupedNames.map(group => {
    group.map(name => {
      let message = {
        type: "group",
        payload: group
      };
      clients.clientList[name].send(JSON.stringify(message));
    });
  });
}
