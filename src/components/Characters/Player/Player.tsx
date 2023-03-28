import React from 'react';
import Character from '../Character/Character';
import { Position } from '../../Map/Map'

interface PlayerProps {
  heroPosition: {
    position: {
      x: number;
      y: number;
    }
    isBusy: boolean;
  }
  onPlayerMove: ({x, y}: Position) => void;
  onInteract: () => void;
  onAttack: () => void;
}

const Player = ({
  heroPosition: { 
    position, 
    isBusy 
  }, 
  onPlayerMove, 
  onInteract,
  onAttack
}: PlayerProps) => {
  return (
    <Character
      position={ position }
      isBusy={ isBusy }
      onCharacterChange={ ({x, y}) => onPlayerMove({x, y}) }
      onInteract={ onInteract }
      onAttack={ onAttack }
    />
  )  
};

export default Player;
