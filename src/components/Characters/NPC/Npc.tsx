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
      position={ position }
      onCharacterChange={ () => console.log(1) }
      onInteract={ () => console.log(2) }
    />
  )
};

export default Npc;