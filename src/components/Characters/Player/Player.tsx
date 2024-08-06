import React, { useEffect } from 'react';

import Character from '@components/Characters/Character/Character';
import { Position } from '@config/types/Position'
import { symbolSize } from '@config/variables/variables';
import { moveKeys } from '@config/variables/moveKeys';
import { getAbsolutePosition } from '@utils/getAbsolutePosition';

interface PlayerProps {
  position: Position;
  isBusy: boolean;
  onMove: ({x, y}: Position) => void;
  onInteract: () => void;
  onAttack: ({x, y}: Position) => void;
}

const Player = ({
  position, 
  isBusy, 
  onMove,
  onInteract,
  onAttack
}: PlayerProps) => {
  const keyListening = (e: KeyboardEvent) => {
    const codePressed = e.code;
    if (Object.keys(moveKeys).includes(codePressed)) {
      // Move
      let [x, y] = moveKeys[codePressed]
      onMove({x, y})
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
      onAttack({x, y})
    } else if (e.button === 0 && e.type==="mouseup"){
      onAttack({x, y})
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

  return (
    <Character 
      position={ position }
    />
  )  
};

export default Player;
