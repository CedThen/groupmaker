import React from "react";

function DisplayGroup({ names }) {
  let nameArray = names.map((name, index) => {
    return <h2 key={index}>{name}</h2>;
  });
  return (
    <div>
      <h2>Your Group is: </h2>
      {nameArray}
    </div>
  );
}

export default DisplayGroup;
