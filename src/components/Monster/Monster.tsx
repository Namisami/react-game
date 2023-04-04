import React from 'react';

import { Position } from '@config/types/Position';
import { symbolSize } from '@config/variables/variables';

import './Monster.css';

interface MonsterProps {
  position: Position
};

const Monster = ({
  position: {
    x,
    y
  }
}: MonsterProps) => {
  return (
    <img 
      className='monster'
      style={{
        left: `${x * symbolSize}px`, 
        top: `${y * symbolSize}px`
      }}
      src='assets\monster.svg'
      alt='Monster'
    />
  )
};

export default Monster;