import React from 'react';

import { Position } from '@config/types/Position';
import { symbolSize } from '@config/variables/variables'
import Character from '../Character/Character';

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