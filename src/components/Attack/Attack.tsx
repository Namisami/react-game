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
  return (
    <div
      className='attack'
      style={{
        left: x - 3,
        top: y - 3,
      }}
    >
      A
    </div>
  )
};

export default Attack;