import React from 'react';

import Character from '@components/Characters/Character/Character';
import { Position } from '@config/types/Position';

interface NpcProps {
  position: Position
}

const Npc = ({ 
  position 
}: NpcProps) => {
  return (
    <Character 
      isNpc={ true }
      isBusy={ false }
      position={ position }
    />
  )
};

export default Npc;