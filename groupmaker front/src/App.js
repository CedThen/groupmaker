import React, { Component } from "react";
import "./App.css";

import Groups from "./Groups.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Group Maker</h1>
        <Groups />
      </div>
    );
  }
}

export default App;
