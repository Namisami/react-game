import React from 'react';
import Character from '../Character/Character';

interface NpcProps {
  position: {
    x: number;
    y: number;
  }
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