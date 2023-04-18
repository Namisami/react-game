import React from 'react';
import { useDispatch } from 'react-redux';

import Player from '@components/Characters/Player/Player';
import { Position } from '@config/types/Position';
import { symbolSize } from '@config/variables/variables';
import { gameMap } from '@utils/loadMap';
import { gameNpcs } from '@utils/loadNpcs';

import { positionChange } from '@store/slices/userSlice'

import './Character.css'

interface CharacterProps {
  position: Position;
  isBusy: boolean;
  isNpc?: boolean;
  isPlayer?: boolean;
  children: ({position, isBusy, move: {x, y}}: any) => JSX.Element
}

const Character = ({ 
    position,
    isBusy, 
    isNpc=false,
    isPlayer=false,
    children
  }: CharacterProps) => {
    const dispatch = useDispatch()

    const collideCheck = ({x, y}: Position) => {
      const differentMapsCheck = (mapType: Map<string, { type: string }>) => {
        let nextBlockType = mapType.get(`${x},${y}`)?.type
        if (typeof nextBlockType === 'undefined') {
          return false
        }
        return ['w', 'n', 'm'].includes(nextBlockType) ? true : false
      }
      return differentMapsCheck(gameMap) || differentMapsCheck(gameNpcs)
    }
  
    const move = ({x, y}: Position) => {
      console.log(x, y)
      if (isBusy) {
        return
      }
      const newPosition = {
        x: position.x + x,
        y: position.y + y,
      }
      console.log(newPosition)
      if (!collideCheck(newPosition)) {
        dispatch(positionChange(newPosition))
      }
    }
  return (
    <>
      { children({
        position, 
        isBusy, 
        move({x, y}: Position) {move({x, y})}
      }) }
    </>
  )
  if (isPlayer) {
    return (
      <Player 
        position={ position }
        isBusy={ isBusy }
        onMove={ ({x, y}) => move({x, y}) }
        // onInteract={ interactCheck }
        // onAttack={ (isAttack, {x, y}) => attack(isAttack, {x, y}) }
      />
    )
  } else {
    return (
      <img 
        className="character"
        style={{
          left: `${position.x * symbolSize}px`, 
          top: `${position.y * symbolSize}px`
        }}
        src={`assets/character.svg`}
        alt='Character'
      />
    )
  }
};

export default Character;