import React from 'react'

import { Position } from '@config/types/Position'
import { symbolSize } from '@config/variables/variables'

interface CharacterProps {
  position: Position
}

const Character = ({
  position
}: CharacterProps) => {
  return (
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
}

export default Character