import React, { useEffect } from 'react';

import './Map.css'


const gameMap = [
  ["w", "w", "w", "w", "w"],
  ["w", "f", "f", "f" ,"w"],
  ["w", "f", "f", "f" ,"w"],
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
  }
}

const Map = () => {

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
    <div>
      { renderBlocks }
    </div>
  )
}

export default Map;