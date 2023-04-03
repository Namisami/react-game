import React, { useEffect } from 'react';
import { Position } from '@config/types/Position';
import { symbolSize } from '@config/variables/variables';

import './Character.css'

interface MoveKeysOption {
  [key: string]: number[]
}

const moveKeys: MoveKeysOption = {
  ArrowUp : [0, -1],
  ArrowRight: [1, 0],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0]
};

interface CharacterProps {
  position: Position
  isBusy: boolean;
  isNpc?: boolean;
  onCharacterChange?: ({x, y}: Position) => void;
  onInteract?: () => void;
  onAttack?: (isAttack: boolean) => void;
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
      const [keyPressed, codePressed] = [e.key, e.code];
      if (Object.keys(moveKeys).includes(keyPressed)) {
        // Move
        let [x, y] = moveKeys[keyPressed];
        onCharacterChange!({x, y});
      } else if (codePressed === 'KeyE') {
        // Interact
        onInteract!()
      } else if (codePressed === 'KeyA') {
        // Attack
        onAttack!(true)
      };
    }

    const mouseListening = (e: MouseEvent) => {
      if (e.button === 0 && e.type==="mousedown") {
        onAttack!(true)
      } else if (e.button === 0 && e.type==="mouseup"){
        onAttack!(false)
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