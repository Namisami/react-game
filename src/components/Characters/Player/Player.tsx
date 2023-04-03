import React from 'react';
import Character from '@components/Characters/Character/Character';
import { Position } from '@config/types/Position'

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
  onAttack: (isAttack: boolean) => void;
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
      onAttack={ (isAttack) => onAttack(isAttack) }
    />
  )  
};

export default Player;
