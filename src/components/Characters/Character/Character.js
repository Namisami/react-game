import React, { useEffect } from 'react';

import './Character.css'

const moveKeys = {
  'ArrowUp' : [0, -1],
  'ArrowRight': [1, 0],
  'ArrowDown': [0, 1],
  'ArrowLeft': [-1, 0]
};

const Character = ({ 
    onCharacterChange, 
    position,
    isBusy, 
    isNpc,
    onInteract
  }) => {
  const keyListening = (e) => {
    const [keyPressed, codePressed] = [e.key, e.code];
    if (Object.keys(moveKeys).includes(keyPressed)) {
      // Move
      onCharacterChange(moveKeys[keyPressed]);
    } else if (codePressed === 'KeyE') {
      // Interact
      onInteract();
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
      left: `${position.x * process.env.REACT_APP_SYMBOL_SIZE}px`, 
      top: `${position.y * process.env.REACT_APP_SYMBOL_SIZE}px`
    }}
    src={`assets/character.svg`}
    alt='Character'
  />
  )
};

export default Character;