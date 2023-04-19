import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Position } from '@config/types/Position';
import { symbolSize } from '@config/variables/variables';
import { selectHero } from '@store/slices/userSlice';

import './Monster.css';

interface MonsterProps {
  position: Position;
  onAttack: ({x, y}: Position) => void;
};

const Monster = ({
  position,
  onAttack,
}: MonsterProps) => {
  const hero = useSelector(selectHero)

  // useEffect(() => {
  //   if ((hero.position.x === position.x + 1) && (hero.position.y === position.y + 1)) {
  //     onAttack({x: hero.position.x, y: hero.position.y})
  //   }
  // }, [hero.position])

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