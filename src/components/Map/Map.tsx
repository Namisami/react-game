import React, { useState, useRef, useEffect } from 'react';
import Attack from '@components/Attack/Attack';

import Npc from '@components/Characters/Npc/Npc';
import Player from '@components/Characters/Player/Player';
import Dialog from '@components/Dialog/Dialog';
import Monster from '@components/Monster/Monster';

import MapDict from '@config/blocks.json';
// import MobDict from '@config/mobs.json';
import { Position } from '@config/types/Position';

import { gameMap } from '@utils/loadMap';
import { gameNpcs } from '@utils/loadNpcs';

import './Map.css';

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
    const differentMapsCheck = (mapType: Map<string, { type: string }>) => {
      let nextBlockType = mapType.get(`${x},${y}`)?.type
      if (typeof nextBlockType === 'undefined') {
        return false
      }
      return ['w', 'n', 'm'].includes(nextBlockType) ? true : false
    }
    return differentMapsCheck(gameMap) || differentMapsCheck(gameNpcs)
  };

  const interactCheck = () => {
    let {x, y} = hero.position;
    if (
      // Position check
      (gameNpcs.get(`${x + 1},${y}`)?.type === 'n' ||
      gameNpcs.get(`${x - 1},${y}`)?.type ==='n' ||
      gameNpcs.get(`${x},${y + 1}`)?.type === 'n' ||
      gameNpcs.get(`${x},${y - 1}`)?.type === 'n') &&
      // Busy check
      (!hero.isBusy &&
      !hero.isAttack)
      ) {
      setHero({ ...hero, position: position.current, isBusy: true })
    }
  }

  const attack = (isAttack: boolean) => {
    setHero({ ...hero, isAttack: isAttack })
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
  
  const renderNpcs = Array.from(gameNpcs).map(([npcPosition]) => {
    let [x, y] = npcPosition.split(',').map(el => parseInt(el));
    return (
      <Npc
        key={`${x}${y}`} 
        position={{x, y}} 
      />
    )
  })

  return (
    <>
      <div className='map'>
        { renderBlocks }
        { renderNpcs }
        <Player 
          heroPosition={ hero }
          onPlayerMove={ ({x, y}) => heroPositionChange({x, y}) }
          onInteract={ interactCheck }
          onAttack={ (isAttack) => attack(isAttack) }
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