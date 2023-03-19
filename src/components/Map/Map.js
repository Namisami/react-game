import React, { useEffect, useState } from 'react';

import Character from '../Character/Character';

import './Map.css'


const gameMap = [
  ["w", "w", "w", "w", "w"],
  ["w", "f", "f", "f" ,"w"],
  ["w", "f", "sp", "f" ,"w"],
  ["w", "f", "f", "f" ,"w"],
  ["w", "w", "w", "w", "w"]
]

const mapDict = {
  "w": {
    path: "wall.svg",
    description: "Cavern wall"
  },
  "f": {
    path: "floor.svg",
    description: "Cavern floor"
  },
  "sp": {
    path: "floor.svg",
    description: "Start position of player"
  },
}

const Map = () => {
  const [heroPosition, setHeroPosition] = useState(
    {
      'position': {
        'x': 2,
        'y': 2,
      }
    }
  );

  const heroPositionChange = (x, y) => {
    setHeroPosition({ ...heroPosition, position: {x: heroPosition.position.x + x, y: heroPosition.position.y + y}, })
  };

  useEffect(() => {
  })
  const renderBlocks = gameMap.map((row) => {
    return (
      <div className='row'>
        { row.map((block) => {
          return (
            <img 
              className='block' 
              src={`assets/${mapDict[block].path}`} 
              alt={ mapDict[block].description } 
            />
          )
        })}
      </div>
    )
  })
  
  return (
    <div className='map'>
      { renderBlocks }
      <Character
                onCharacterChange={ ([x, y]) => heroPositionChange(x, y) }
                heroPosition={ heroPosition }
              />
    </div>
  )
}

export default Map;