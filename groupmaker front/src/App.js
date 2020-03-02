import React from "react";
import "./App.scss";
import Groups from "./Groups.js";
import Home from "./Pages/Home";

const URL = "ws://localhost:3030";

class App extends React.PureComponent {
  ws = new WebSocket(URL);

  componentDidMount() {
    this.ws.onopen = () => {
      console.log("connected");
    };
  }

  render() {
    return (
      <div className="App">
        {/* <Home /> */}
        <Groups ws={this.ws} />
      </div>
    );
  }
}

export default App;
