import React, { useEffect } from 'react';

import './Character.css'

const symbolSize: any = process.env.REACT_APP_SYMBOL_SIZE; 

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
  position: {
    x: number;
    y: number;
  }
  isBusy: boolean;
  isNpc?: boolean;
  onCharacterChange?: (x: number, y: number) => void;
  onInteract?: () => void;
  onAttack?: () => void;
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
        onCharacterChange!(x, y);
      } else if (codePressed === 'KeyE') {
        // Interact
        onInteract!();
      } else if (codePressed === 'KeyA') {
        // Attack
        onAttack!();
      };
    }
    
    useEffect(() => {
      if (isNpc || isBusy) {
        return
      }
    document.addEventListener("keydown", keyListening);
    return () => {
      document.removeEventListener("keydown", keyListening);
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