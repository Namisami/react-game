import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Character from '@components/Characters/Character/Character';
import { Position } from '@config/types/Position'
import { symbolSize } from '@config/variables/variables';
import { moveKeys } from '@config/variables/moveKeys';
import { gameMap } from '@utils/loadMap';
import { gameNpcs } from '@utils/loadNpcs';
import { getAbsolutePosition } from '@utils/getAbsolutePosition';

import { positionChange } from '@store/slices/userSlice'

import '../Character/Character.css'

interface PlayerProps {
  position: Position;
  isBusy: boolean;
  onMove: ({x, y}: Position) => void;
  onInteract?: () => void;
  onAttack?: (isAttack: boolean, {x, y}: Position) => void;
}

const Player = ({
  position, 
  isBusy, 
  onMove,
  onInteract,
  onAttack
}: PlayerProps) => {
  const dispatch = useDispatch()

  const keyListening = (e: KeyboardEvent) => {
    const codePressed = e.code;
    if (Object.keys(moveKeys).includes(codePressed)) {
      // Move
      let [x, y] = moveKeys[codePressed];
      onMove({x, y});
    } else if (codePressed === 'KeyE') {
      // Interact
      onInteract!()
    }
  }

  const mouseListening = (e: MouseEvent) => {
    // Attack in different sides
    const [playerX, playerY] = getAbsolutePosition(position)
    const [a, b] = [e.clientX - playerX, e.clientY - playerY]
    const c = Math.sqrt(a*a + b*b)
    const [x, y] = [a / c * symbolSize, b / c * symbolSize]
    if (e.button === 0 && e.type==="mousedown") {
      onAttack!(true, {x, y})
    } else if (e.button === 0 && e.type==="mouseup"){
      onAttack!(false, {x, y})
    }
  }
  
  useEffect(() => {
    if (isBusy) {
      return
    }
    document.addEventListener("keydown", keyListening);
    document.addEventListener("mousedown", mouseListening);
    document.addEventListener("mouseup", mouseListening);
    return () => {
      document.removeEventListener("keydown", keyListening);
      document.removeEventListener("mousedown", mouseListening);
      document.removeEventListener("mouseup", mouseListening);
    }
  })

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

  return (
    // <Character
    //   position={ position }
    //   isBusy={ isBusy }
    //   isNpc={ false }
    // />
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
};

export default Player;
