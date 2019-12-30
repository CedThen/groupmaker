import React, { useState } from "react";

function SplitGroups({ ws, nameArray }) {
  const [groupSize, setGroupSize] = useState(1);
  const [numGroups, setNumGroups] = useState(1);

  const splitGroupsClick = () => {
    let message = {
      type: "splitgroups",
      payload: { groupSize, numGroups }
    };
    ws.send(JSON.stringify(message));
    console.log("sent message");
  };

  return (
    <div>
      Group Size: {groupSize}
      <input
        type="range"
        min="1"
        max="10"
        name="numbergroups"
        defaultValue="1"
        onChange={event => setGroupSize(event.target.value)}
      />
      Number of Groups: {numGroups}
      <input
        type="range"
        min="1"
        max="10"
        name="numbergroups"
        defaultValue="1"
        onChange={event => setNumGroups(event.target.value)}
      />
      <input type="submit" value="Split!" onClick={splitGroupsClick} />
    </div>
  );
}

export default SplitGroups;
