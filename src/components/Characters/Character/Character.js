import React, { useEffect } from 'react';

import './Character.css'

const Character = ({ onCharacterChange, heroPosition, isNpc }) => {
  const move = (e) => {
    const keyPressed = e.key;
    const moveKeys = {
      'ArrowUp' : [0, -1],
      'ArrowRight': [1, 0],
      'ArrowDown': [0, 1],
      'ArrowLeft': [-1, 0]
    };
    if (Object.keys(moveKeys).includes(keyPressed)) {
      onCharacterChange(moveKeys[keyPressed]);
    };
  }

  useEffect(() => {
    if (isNpc) {
      return
    }
    document.addEventListener("keydown", move);
    return () => {
      document.removeEventListener("keydown", move);
    };
  });

  return (
  <img 
    className="character"
    style={{
      left: `${heroPosition.position.x * process.env.REACT_APP_SYMBOL_SIZE}px`, 
      top: `${heroPosition.position.y * process.env.REACT_APP_SYMBOL_SIZE}px`
    }}
    src={`assets/character.svg`}
    alt='Character'
  />
  )
};

export default Character;