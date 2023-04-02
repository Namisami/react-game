import React, { useState, useRef, useEffect } from 'react';
import Attack from '@components/Attack/Attack';

import Npc from '@components/Characters/Npc/Npc';
import Player from '@components/Characters/Player/Player';
import Dialog from '@components/Dialog/Dialog';
import Monster from '@components/Monster/Monster';

import { loadMap } from '@utils/loadMap';

const gameMap: Map<string, { type: string }> = loadMap();

import './Map.css';

// import MobDict from '@config/mobs.json';
import MapDict from '@config/blocks.json';

export interface Position {
  x: number;
  y: number;
}

const Map = () => {
  const [hero, setHero] = useState(
    {
      position: {
        x: 2,
        y: 2,
      },
      isBusy: false,
      isAttack: false,
    }
  );

  const [mobs, setMobs] = useState([])

  const position = useRef<Position>(hero.position)
    
  useEffect(() => {
    position.current = hero.position
  }, [hero.position])

  const generatedMobs = () => {
    return (
      <Monster 
        position={{
          x: 6,
          y: 1
        }}
      />
    )
  }

  const collideCheck = ({x, y}: Position) => {
    let nextBlockType = gameMap.get(`${x},${y}`)?.type
    if (typeof nextBlockType === 'undefined') {
      throw new Error('You reach the end of the world')
    }
    return ['w', 'n', 'm'].includes(nextBlockType) ? true : false
  };

  const interactCheck = () => {
    let {x, y} = hero.position;
    if (
      // Position check
      (gameMap.get(`${x + 1},${y}`)?.type === 'n' ||
      gameMap.get(`${x - 1},${y}`)?.type ==='n' ||
      gameMap.get(`${x},${y + 1}`)?.type === 'n' ||
      gameMap.get(`${x},${y - 1}`)?.type === 'n') &&
      // Busy check
      (!hero.isBusy &&
      !hero.isAttack)
      ) {
      setHero({ ...hero, position: position.current, isBusy: true })
    }
  }

  const attack = () => {
    // Need to check more on abuse
    if (hero.isAttack) {
      return
    }
    setHero({ ...hero, isAttack: true })
    const timeoutId = setTimeout(() => {
      setHero({ ...hero, position: position.current, isAttack: false });
      clearTimeout(timeoutId)
    }, 1000)
  }

  const heroPositionChange = ({x, y}: Position) => {
    if (hero.isBusy) {
      return
    }
    const newPosition = {
      x: hero.position.x + x,
      y: hero.position.y + y,
    }
    if (!collideCheck(newPosition)) {
      setHero({ ...hero, position: {x: newPosition.x, y: newPosition.y}, })
    }
  };

  const renderBlocks = Array.from(gameMap).map(([blockPosition, { type: blockType }]) => {
    let [x, y] = blockPosition.split(',').map(el => parseInt(el));
    return (
      <img key={`${x}${y}`} 
        className='block' 
        style={{
          left: x * 25,
          top: y * 25
        }}
        src={`assets/${MapDict[blockType as keyof typeof MapDict].path}`} 
        alt={ MapDict[blockType as keyof typeof MapDict].description } 
      />
    )
  })
  
  return (
    <>
      <div className='map'>
        { renderBlocks }
        <Player 
          heroPosition={ hero }
          onPlayerMove={ ({x, y}) => heroPositionChange({x, y}) }
          onInteract={ interactCheck }
          onAttack={ attack }
        />
        { hero.isAttack &&
          <Attack 
            position={ hero.position }
          />
        }
      </div>
      { hero.isBusy &&
        <Dialog onEndBtnClick={ () => setHero({ ...hero, 'isBusy': false }) }/>
      }
    </>
  )
}

export default Map;