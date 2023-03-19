import React, { useEffect } from 'react';

const Character = ({ onCharacterChange, heroPosition }) => {
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
    document.addEventListener("keydown", move);
    return () => {
      document.removeEventListener("keydown", move);
    };
  });

  const style = {}
  console.log(style)

  return (
  <div 
    className="character"
    style={{
      left: `${heroPosition.position.x * process.env.REACT_APP_SYMBOL_SIZE}px`, 
      top: `${heroPosition.position.y * process.env.REACT_APP_SYMBOL_SIZE}px`
    }}
  >
    ◉
  </div>)
};

export default Character;