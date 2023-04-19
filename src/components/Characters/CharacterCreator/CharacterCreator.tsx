import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Position } from '@config/types/Position';
import { gameMap } from '@utils/loadMap';
import { gameNpcs } from '@utils/loadNpcs';
import { getAbsolutePosition } from '@utils/getAbsolutePosition';
import { getRelativePosition } from '@utils/getRelativePosition';
import { positionChange, busyChange, eyeDirectionChange, attackChange } from '@store/slices/userSlice'
import { getDamage } from '@store/slices/mobsSlice'
import { selectHero } from '@store/slices/userSlice';
import { selectMobs } from '@store/slices/mobsSlice';

import './CharacterCreator.css'

interface CharacterCreatorProps {
  position: Position;
  isBusy?: boolean;
  isNpc?: boolean;
  isPlayer?: boolean;
  children: ({position, isBusy, move: {x, y}}: any) => JSX.Element
}

const CharacterCreator = ({ 
    position,
    isBusy=false, 
    isNpc=false,
    isPlayer=false,
    children
  }: CharacterCreatorProps) => {
    const dispatch = useDispatch()
    const hero = useSelector(selectHero)
    const mobs = useSelector(selectMobs)

    const collideCheck = ({x, y}: Position) => {
      const differentMapsCheck = (mapType: Map<string, { type: string }>) => {
        let nextBlockType = mapType.get(`${x},${y}`)?.type
        if (typeof nextBlockType === 'undefined') {
          return false
        }
        let nextMob = mobs.find((mob) => {
          if (mob.position.x === x && mob.position.y === y) {
            return true
          }
        })
        if (typeof nextMob !== 'undefined') {
          return true
        }
        return ['w', 'n', 'm'].includes(nextBlockType) ? true : false
      }
      return differentMapsCheck(gameMap) || differentMapsCheck(gameNpcs)
    }
  
    const move = ({x, y}: Position) => {
      if (isBusy) {
        return
      }
      const newPosition = {
        x: position.x + x,
        y: position.y + y,
      }
      if (!collideCheck(newPosition)) {
        dispatch(positionChange(newPosition))
      }
    }
    
  const interact = () => {
    let {x, y} = position;
    if (
      // Position check
      (gameNpcs.get(`${x + 1},${y}`)?.type === 'n' ||
      gameNpcs.get(`${x - 1},${y}`)?.type ==='n' ||
      gameNpcs.get(`${x},${y + 1}`)?.type === 'n' ||
      gameNpcs.get(`${x},${y - 1}`)?.type === 'n') &&
      // Busy check
      (!isBusy &&
      !hero.isAttack)
      ) {
      dispatch(busyChange(true))
    }
  }

  const attackCheck = () => {
    const [playerX, playerY] = getAbsolutePosition({x: position.x, y: position.y})
    const attackPosition = [playerX + hero.eyeDirection.x, playerY + hero.eyeDirection.y]
    const [attackX, attackY] = getRelativePosition({x: attackPosition[0], y: attackPosition[1]})
    mobs.find((mob) => {
      if (mob.position.x === attackX && mob.position.y === attackY) {
        dispatch(getDamage({target: mob, damage: 10}))
      }
    })
  }

  const attack = ({x, y}: Position) => {
    dispatch(eyeDirectionChange({x, y}))
    dispatch(attackChange(!hero.isAttack))
    if (hero.isAttack) {
      attackCheck()
    }
    dispatch(attackChange(!hero.isAttack))
  }

  return (
    <>
      { children({
        position, 
        isBusy, 
        move({x, y}: Position) {move({x, y})},
        attack({x, y}: Position) {attack({x, y})},
        interact() {interact()}
      }) }
    </>
  )
};

export default CharacterCreator;