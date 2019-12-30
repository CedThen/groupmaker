import React from "react";
import GroupJoin from "./GroupJoin.js";
import CurrentlyJoined from "./CurrentlyJoined.js";
import SplitGroups from "./SplitGroups.js";
const URL = "ws://localhost:3030";

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      isLeader: false
    };
  }

  ws = new WebSocket(URL);

  componentDidMount() {
    this.ws.onopen = () => {
      console.log("connected");
    };

    this.ws.onmessage = evt => {
      console.log(evt.data);
      const key = JSON.parse(evt.data).type;
      switch (key) {
        case "namearray":
          const nameArray = JSON.parse(evt.data).payload;
          console.log(nameArray);
          this.setState({ names: nameArray });
          break;
        case "group":
          console.log("receiving group");
          const groupArray = JSON.parse(evt.data).payload;
          this.setState({ names: groupArray });
          break;
        default:
          break;
      }
    };

    this.ws.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL)
      });
    };
  }

  render() {
    return (
      <div>
        <GroupJoin ws={this.ws} id={this.state.ID} />
        <CurrentlyJoined names={this.state.names} />
        <SplitGroups ws={this.ws} nameArray={this.state.names} />
      </div>
    );
  }
}

export default Groups;
