import React from 'react';

import './Attack.css';

interface AttackProps {
  // In future attack type would be REQUIRED
  attackType?: string;
  position: {
    x: number,
    y: number
  };
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
        left: (x + 1) * 25,
        top: y * 25,
      }}
    >
      A
    </div>
  )
};

export default Attack;