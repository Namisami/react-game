import React from 'react';

import Character from '@components/Characters/Character/Character';
import { Position } from '@config/types/Position'

interface PlayerProps {
  position: Position;
  isBusy: boolean;
  onPlayerMove: ({x, y}: Position) => void;
  onInteract: () => void;
  onAttack: (isAttack: boolean, {x, y}: Position) => void;
}

const Player = ({
  position, 
  isBusy, 
  onPlayerMove, 
  onInteract,
  onAttack
}: PlayerProps) => {
  return (
    <Character
      position={ position }
      isBusy={ isBusy }
      isNpc={ false }
      onCharacterChange={ ({x, y}) => onPlayerMove({x, y}) }
      onInteract={ onInteract }
      onAttack={ (isAttack, {x, y}) => onAttack(isAttack, {x, y}) }
    />
  )  
};

export default Player;
