import React from 'react';
import Character from '../Character/Character';

const Player = ({heroPosition, onPlayerMove, onInteract}) => {
  return (
    <Character
      onCharacterChange={ ([x, y]) => onPlayerMove(x, y) }
      onInteract={ onInteract }
      position={ heroPosition }
    />
  )  
};

export default Player;
