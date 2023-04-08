import React from 'react';

import { Position } from '@config/types/Position';

import './Attack.css';

interface AttackProps {
  // In future attack type would be REQUIRED
  attackType?: string;
  position: Position
}

const Attack = ({
  attackType,
  position: {
    x,
    y
  },
}: AttackProps) => {
  console.log(x, y)
  return (
    <div
      className='attack'
      style={{
        left: x,
        top: y,
      }}
    >
      A
    </div>
  )
};

export default Attack;