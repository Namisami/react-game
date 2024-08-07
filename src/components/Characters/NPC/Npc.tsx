import React from 'react';

import Character from '@components/Characters/Character/Character';
import { Position } from '@config/types/Position';
// import { symbolSize } from '@config/variables/variables'

interface NpcProps {
  position: Position
}

const Npc = ({ 
  position 
}: NpcProps) => {
  return (
    <Character 
      position={ position }
    />
  )
};

export default Npc;
