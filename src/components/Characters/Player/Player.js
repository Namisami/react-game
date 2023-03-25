import React from 'react';
import Character from '../Character/Character';

const Player = ({heroPosition: { position, isBusy }, onPlayerMove, onInteract}) => {
  return (
    <Character
      onCharacterChange={ ([x, y]) => onPlayerMove(x, y) }
      onInteract={ onInteract }
      isBusy={ isBusy }
      position={ position }
    />
  )  
};

export default Player;
