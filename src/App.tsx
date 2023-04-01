import React from "react";
import Map from "./components/Map/Map";

import './App.css'

function App() {
  return (
    <div className="app">
      <div className="side-block">
        There will be some data
      </div>
      <div className="main-block">
        <Map />
      </div>
      <div className="side-block">
        There will be some data
      </div>
    </div>
  );
}

export default App;
