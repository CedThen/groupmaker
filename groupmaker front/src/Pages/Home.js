import React from "react";
import "./Home.scss";

const Home = () => {
  return (
    <div>
      <header className="header">
        <h1 className="header__h1">Group Maker</h1>
      </header>
      <div className="header__button-container">
        <input
          type="button"
          class="home-button-one"
          value="Make a New Group!"
        />

        <input
          type="button"
          class="home-button-two"
          value="Join an existing group!"
        />
      </div>
    </div>
  );
};

export default Home;
