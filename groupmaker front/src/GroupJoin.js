import React, { useState } from "react";

function GroupJoin({ ws }) {
  const [name, setName] = useState("");

  const submitClick = () => {
    if (name === "") {
      alert("please enter a valid name");
    } else {
      let message = {
        type: "addname",
        payload: name
      };
      ws.send(JSON.stringify(message));
      setName("");
    }
  };

  return (
    <div>
      <span>
        <h3>Enter your name: </h3>
      </span>
      <form onSubmit={event => submitClick(event)}>
        <input
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
          autoFocus
        />

        <input type="submit" value="Join the Group!" />
      </form>
    </div>
  );
}

export default GroupJoin;
