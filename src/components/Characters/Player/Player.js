import React from 'react';
import Character from '../Character/Character';

const Player = ({heroPosition, onPlayerMove}) => {
  return (
    <Character
      onCharacterChange={ ([x, y]) => onPlayerMove(x, y) }
      position={ heroPosition }
    />
  )  
};

export default Player;
