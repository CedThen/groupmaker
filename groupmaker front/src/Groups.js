import React from "react";
import GroupJoin from "./GroupJoin.js";
import CurrentlyJoined from "./CurrentlyJoined.js";
import SplitGroups from "./SplitGroups.js";
import DisplayGroup from "./Components/DisplayGroup.js";

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      isJoining: true
    };
  }

  componentDidMount() {
    this.props.ws.onopen = () => {
      console.log("connected");
    };
    this.props.ws.onmessage = evt => {
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
          this.setState({ isJoining: false });
          break;
        default:
          break;
      }
    };
    this.props.ws.onclose = () => {
      console.log("disconnected");
    };
  }

  render() {
    return (
      <div>
        {this.state.isJoining ? (
          <div>
            <GroupJoin ws={this.props.ws} id={this.state.ID} />
            <CurrentlyJoined names={this.state.names} />
            <SplitGroups ws={this.props.ws} nameArray={this.state.names} />
          </div>
        ) : (
          <DisplayGroup names={this.state.names} />
        )}
      </div>
    );
  }
}

export default Groups;
