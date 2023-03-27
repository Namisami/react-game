import React, { useState } from 'react';

import Npc from '../Characters/Npc/Npc';
import Player from '../Characters/Player/Player';
import Dialog from '../Dialog/Dialog';
import Monster from '../Monster/Monster';

import './Map.css'


const gameMap = [
  ["w", "w", "w", "w", "w", "w", "w", "w"],
  ["w", "f", "f", "f", "w", "f", "m", "w"],
  ["w", "f", "f", "f" ,"f", "f", "f", "w"],
  ["w", "w", "f", "f" ,"w", "f", "n", "w"],
  ["w", "w", "f", "f" ,"w", "w", "f", "w"],
  ["w", "w", "w", "w", "w", "w", "w", "w"]
]

interface MapDictI {
  [key: string]: {
    path: string;
    description: string;
  }
}

const MapDict: MapDictI = {
  w: {
    path: "wall.svg",
    description: "Cavern wall"
  },
  f: {
    path: "floor.svg",
    description: "Cavern floor"
  },
  sp: {
    path: "floor.svg",
    description: "Start position of player"
  },
  n: {
    path: "floor.svg",
    description: "Floor under the character"
  },
  m: {
    path: "floor.svg",
    description: "Floor under the evil-evil monster"
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
    
  const collideCheck = ({x, y}: {x: number, y: number}) => {
    return gameMap[y][x]=== 'w' || gameMap[y][x]=== 'n' || gameMap[y][x] === 'm' ? true : false
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

  const heroPositionChange = (x: number, y: number) => {
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

  const renderBlocks = gameMap.map((row, y) => {
    return (
      // Key must be NOT index; just for test
      <div key={ y } className='row'>
        { row.map((block: string, x: number) => {
          return (
            <React.Fragment key={ `row${x}` }>
              { block === "n" &&
                <Npc
                  position={{
                    x,
                    y
                  }}
                />
              } 
              { block === "m" &&
                <Monster 
                  position={{
                    x,
                    y
                  }}
                />
              }
              <img 
                className='block' 
                src={`assets/${MapDict[block].path}`} 
                alt={ MapDict[block].description } 
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