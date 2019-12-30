import React from "react";

function GroupJoin({ names }) {
  let nameArray = names.map((name, index) => {
    return <h2 key={index}>{name}</h2>;
  });

  const emptyNames = <h2>No one here</h2>;

  return (
    <div>
      <h1>Currently Joined: </h1>
      {nameArray.length === 0 ? emptyNames : nameArray}
    </div>
  );
}

export default GroupJoin;
