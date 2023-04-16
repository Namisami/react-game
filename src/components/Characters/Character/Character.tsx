import React from 'react';

import { Position } from '@config/types/Position';
import { symbolSize } from '@config/variables/variables';

import './Character.css'

interface CharacterProps {
  position: Position
  isBusy: boolean;
  isNpc: boolean;
}

const Character = ({ 
    position,
    isBusy, 
    isNpc,
  }: CharacterProps) => {
  return (
    <img 
      className="character"
      style={{
        left: `${position.x * symbolSize}px`, 
        top: `${position.y * symbolSize}px`
      }}
      src={`assets/character.svg`}
      alt='Character'
    />
  )
};

export default Character;