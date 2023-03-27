import React from 'react';
import Character from '../Character/Character';

interface PlayerProps {
  heroPosition: {
    position: {
      x: number;
      y: number;
    }
    isBusy: boolean;
  }
  onPlayerMove: (x: number, y: number) => void;
  onInteract: () => void;
}

const Player = ({
  heroPosition: { 
    position, 
    isBusy 
  }, 
  onPlayerMove, 
  onInteract
}: PlayerProps) => {
  return (
    <Character
      onCharacterChange={ (x, y) => onPlayerMove(x, y) }
      onInteract={ onInteract }
      isBusy={ isBusy }
      position={ position }
    />
  )  
};

export default Player;
