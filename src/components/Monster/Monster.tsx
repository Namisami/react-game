import React from 'react';

import './Monster.css';

const symbolSize: any = process.env.REACT_APP_SYMBOL_SIZE; 

interface MonsterProps {
  position: {
    x: number,
    y: number
  }
};

const Monster = ({
  position
}: MonsterProps) => {
  return (
    <img 
      className='monster'
      style={{
        left: `${position.x * symbolSize}px`, 
        top: `${position.y * symbolSize}px`
      }}
      src='assets\monster.svg'
      alt='Monster'
    />
  )
};

export default Monster;