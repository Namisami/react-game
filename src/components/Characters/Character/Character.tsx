import React, { useEffect } from 'react';

import { Position } from '@config/types/Position';
import { symbolSize } from '@config/variables/variables';
import { moveKeys } from '@config/variables/moveKeys';

import './Character.css'

interface CharacterProps {
  position: Position
  isBusy: boolean;
  isNpc: boolean;
  onCharacterChange?: ({x, y}: Position) => void;
  onInteract?: () => void;
  onAttack?: (isAttack: boolean, {x, y}: Position) => void;
}

const Character = ({ 
    position,
    isBusy, 
    isNpc,
    onCharacterChange, 
    onInteract,
    onAttack
  }: CharacterProps) => {
    const keyListening = (e: KeyboardEvent) => {
      const codePressed = e.code;
      if (Object.keys(moveKeys).includes(codePressed)) {
        // Move
        let [x, y] = moveKeys[codePressed];
        onCharacterChange!({x, y});
      } else if (codePressed === 'KeyE') {
        // Interact
        onInteract!()
      }
    }

    const mouseListening = (e: MouseEvent) => {
      // Attack in different sides
      const map = document.querySelector('div.map')
      const mapCords = map!.getBoundingClientRect()
      const [mapX, mapY] = [mapCords!.x, mapCords!.y]
      const [playerX, playerY] = [position.x * 25 + mapX, position.y * 25 + mapY]
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
      if (isNpc || isBusy) {
        return
      }
    document.addEventListener("keydown", keyListening);
    document.addEventListener("mousedown", mouseListening);
    document.addEventListener("mouseup", mouseListening);
    return () => {
      document.removeEventListener("keydown", keyListening);
      document.removeEventListener("mousedown", mouseListening);
      document.removeEventListener("mouseup", mouseListening);
    };
  });

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
};

export default Character;