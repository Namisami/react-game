import React from 'react';
import Character from '../Character/Character';

const NPC = ({ position }) => {
  return (
    <Character 
      isNpc={ true }
      position={ position }
    />
  )
};

export default NPC;