import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Attack from '@components/Attack/Attack';
import Npc from '@components/Characters/Npc/Npc';
import Player from '@components/Characters/Player/Player';
import Dialog from '@components/Dialog/Dialog';
import Monster from '@components/Monster/Monster';

import MapDict from '@config/blocks.json';
// import MobDict from '@config/mobs.json';
import { Position } from '@config/types/Position';
import { symbolSize } from '@config/variables/variables';

import { gameMap } from '@utils/loadMap';
import { gameNpcs } from '@utils/loadNpcs';
import { loadMobs } from '@utils/loadMobs';
import { getAbsolutePosition } from '@utils/getAbsolutePosition';
import { getRelativePosition } from '@utils/getRelativePosition';

import {
  positionChange,
  busyChange,
  attackChange,
  eyeDirectionChange
} from '@store/slices/userSlice'
import {
  getDamage
} from '@store/slices/mobsSlice'
import { selectHero } from '@store/slices/userSlice';
import { selectMobs } from '@store/slices/mobsSlice';
import { MobState } from '@store/slices/mobsSlice'

import './Map.css';


const Map = () => {
  const dispatch = useDispatch()
  const hero = useSelector(selectHero)
  const mobs = useSelector(selectMobs)
  
  const position = useRef<Position>(hero.position)
  
  useEffect(() => {
    position.current = hero.position
  }, [hero.position])

  useEffect(() => {
    loadMobs()
  }, [])

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
      dispatch(busyChange(true))
    }
  }

  const attackCheck = () => {
    const [playerX, playerY] = getAbsolutePosition({x: position.current.x, y: position.current.y})
    const attackPosition = [playerX + hero.eyeDirection.x, playerY + hero.eyeDirection.y]
    const [attackX, attackY] = getRelativePosition({x: attackPosition[0], y: attackPosition[1]})
    mobs.find((mob) => {
      if (mob.position.x === attackX && mob.position.y === attackY) {
        dispatch(getDamage({target: mob, damage: 10}))
      }
    })
  }

  const attack = (isAttack: boolean, {x, y}: Position) => {
    dispatch(eyeDirectionChange({x, y}))
    if (isAttack) {
      attackCheck()
    }
    dispatch(attackChange(isAttack))
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
      dispatch(positionChange(newPosition))
    }
  };

  const renderBlocks = Array.from(gameMap).map(([blockPosition, { type: blockType }]) => {
    let [x, y] = blockPosition.split(',').map(el => parseInt(el));
    return (
      <img key={`${x}${y}`} 
        className='block' 
        style={{
          left: x * symbolSize,
          top: y * symbolSize
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
        key={`${x}${y}_npc`} 
        position={{x, y}} 
      />
    )
  })
  
  const renderMobs = mobs.map((mob: MobState) => {
    const {x, y} = mob.position
    return (
      <Monster 
        key={`${x}${y}_mob`} 
        position={{x, y}}
      />
    )
  })

  return (
    <>
      <div className='map'>
        { renderBlocks }
        { renderNpcs }
        { renderMobs }
        <Player 
          position={ hero.position }
          isBusy={ hero.isBusy }
          onPlayerMove={ ({x, y}) => heroPositionChange({x, y}) }
          onInteract={ interactCheck }
          onAttack={ (isAttack, {x, y}) => attack(isAttack, {x, y}) }
        />
        { hero.isAttack &&
          <Attack 
            position={{ 
              x: hero.position.x * symbolSize + symbolSize / 3 + hero.eyeDirection.x, 
              y: hero.position.y * symbolSize + hero.eyeDirection.y 
            }}
          />
        }
      </div>
      { hero.isBusy &&
        <Dialog onEndBtnClick={ () => dispatch(busyChange(false))}/>
      }
    </>
  )
}

export default Map;