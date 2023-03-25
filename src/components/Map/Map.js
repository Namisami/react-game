import React, { useEffect, useState } from 'react';

import NPC from '../Characters/NPC/NPC';
import Player from '../Characters/Player/Player';
import Dialog from '../Dialog/Dialog';

import './Map.css'


const gameMap = [
  ["w", "w", "w", "w", "w", "w", "w", "w"],
  ["w", "f", "f", "f", "w", "f", "f", "w"],
  ["w", "f", "f", "f" ,"f", "f", "f", "w"],
  ["w", "w", "f", "f" ,"w", "f", "n", "w"],
  ["w", "w", "f", "f" ,"w", "w", "f", "w"],
  ["w", "w", "w", "w", "w", "w", "w", "w"]
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
  "n": {
    path: "floor.svg",
    description: "Floor under the character"
  }
}

const Map = () => {
  const [heroPosition, setHeroPosition] = useState(
    {
      'position': {
        'x': 2,
        'y': 2,
      },
      'isBusy': false
    }
  );
    
  const collideCheck = (newPosition) => {
    if (gameMap[newPosition.y][newPosition.x]=== 'w' || gameMap[newPosition.y][newPosition.x]=== 'n') {
      return 1
    } else {
      return 0
    }
  };

  const interactCheck = () => {
    if (
      gameMap[heroPosition.position.y + 1][heroPosition.position.x] === 'n' ||
      gameMap[heroPosition.position.y + 1][heroPosition.position.x] === 'n' ||
      gameMap[heroPosition.position.y - 1][heroPosition.position.x + 1] === 'n' ||
      gameMap[heroPosition.position.y - 1][heroPosition.position.x - 1] === 'n' ||
      gameMap[heroPosition.position.y][heroPosition.position.x + 1] === 'n' ||
      gameMap[heroPosition.position.y][heroPosition.position.x - 1] === 'n'
    ) {
      setHeroPosition({ ...heroPosition, isBusy: true })
    }
  }

  const heroPositionChange = (x, y) => {
    if (heroPosition.isBusy) {
      return
    }
    const newPosition = {
      x: heroPosition.position.x + x,
      y: heroPosition.position.y + y,
    }
    if (!collideCheck(newPosition)) {
      setHeroPosition({ ...heroPosition, position: {x: newPosition.x, y: newPosition.y}, })
    }
  };

  useEffect(() => {
  })
  const renderBlocks = gameMap.map((row, index) => {
    return (
      // Key must be NOT index; just for test
      <div key={ index } className='row'>
        { row.map((block, bIndex) => {
          return (
            <React.Fragment key={ `row${bIndex}` }>
              { block === "n" &&
                <NPC 
                  position={{
                    'x': bIndex, 
                    'y': index
                  }}
                />
              } 
              <img 
                className='block' 
                src={`assets/${mapDict[block].path}`} 
                alt={ mapDict[block].description } 
              />
            </React.Fragment>
          )
        })}
      </div>
    )
  })
  
  return (
    <>
      <div className='map'>
        { renderBlocks }
        <Player 
          onPlayerMove={ (x, y) => heroPositionChange(x, y) }
          onInteract={ interactCheck }
          heroPosition={ heroPosition }
        />
      </div>
      { heroPosition.isBusy &&
        <Dialog onEndBtnClick={ () => setHeroPosition({ ...heroPosition, 'isBusy': false }) }/>
      }
    </>
  )
}

export default Map;