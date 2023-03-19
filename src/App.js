import React, { useState } from "react";
import Character from "./components/Character/Character";
import Map from "./components/Map/Map";

import './App.css'

function App() {
  const [heroPosition, setHeroPosition] = useState(
    {
      'position': {
        'x': 0,
        'y': 0,
      }
    }
  );

  const heroPositionChange = (x, y) => {
    setHeroPosition({ ...heroPosition, position: {x: heroPosition.position.x + x, y: heroPosition.position.y + y}, })
  };

  return (
    <div className="App">
      <Character
        onCharacterChange={ ([x, y]) => heroPositionChange(x, y) }
        heroPosition={ heroPosition }
      />
      <Map />
    </div>
  );
}

export default App;
