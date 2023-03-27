import React, { useState, useRef, useEffect } from 'react';
import Attack from '../Attack/Attack';

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

interface Position {
  x: number;
  y: number;
}

const Map = () => {
  const [heroPosition, setHeroPosition] = useState(
    {
      position: {
        x: 2,
        y: 2,
      },
      isBusy: false,
      isAttack: false,
    }
  );
  const position = useRef<Position>(heroPosition.position)
    
  useEffect(() => {
    position.current = heroPosition.position
  }, [heroPosition.position])

  const collideCheck = ({x, y}: Position) => {
    return gameMap[y][x]=== 'w' || gameMap[y][x]=== 'n' || gameMap[y][x] === 'm' ? true : false
  };

  const interactCheck = () => {
    if (
      // Position check
      (gameMap[heroPosition.position.y + 1][heroPosition.position.x] === 'n' ||
      gameMap[heroPosition.position.y + 1][heroPosition.position.x] === 'n' ||
      gameMap[heroPosition.position.y - 1][heroPosition.position.x + 1] === 'n' ||
      gameMap[heroPosition.position.y - 1][heroPosition.position.x - 1] === 'n' ||
      gameMap[heroPosition.position.y][heroPosition.position.x + 1] === 'n' ||
      gameMap[heroPosition.position.y][heroPosition.position.x - 1] === 'n') &&
      // Busy check
      (heroPosition.isBusy &&
      !heroPosition.isAttack)
      ) {
      setHeroPosition({ ...heroPosition, position: position.current, isBusy: true })
    }
  }

  const attack = () => {
    // Need to check more on abuse
    if (heroPosition.isAttack) {
      return
    }
    setHeroPosition({ ...heroPosition, isAttack: true })
    const timeoutId = setTimeout(() => {
      setHeroPosition({ ...heroPosition, position: position.current, isAttack: false });
      clearTimeout(timeoutId)
    }, 1000)
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
          heroPosition={ heroPosition }
          onPlayerMove={ (x, y) => heroPositionChange(x, y) }
          onInteract={ interactCheck }
          onAttack={ attack }
        />
        { heroPosition.isAttack &&
          <Attack 
            position={ heroPosition.position }
          />
        }
      </div>
      { heroPosition.isBusy &&
        <Dialog onEndBtnClick={ () => setHeroPosition({ ...heroPosition, 'isBusy': false }) }/>
      }
    </>
  )
}

export default Map;