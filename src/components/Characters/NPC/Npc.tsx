import React from 'react';

import Character from '@components/Characters/Character/Character';
import { Position } from '@config/types/Position';
import { symbolSize } from '@config/variables/variables'

interface NpcProps {
  position: Position
}

const Npc = ({ 
  position 
}: NpcProps) => {
  return (
    // <Character 
    //   isNpc={ true }
    //   isBusy={ false }
    //   position={ position }
    // />
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

export default Npc;