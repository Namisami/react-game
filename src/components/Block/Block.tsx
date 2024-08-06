import React from "react"

import { Position } from '@config/types/Position'
import { symbolSize } from "@config/variables/variables";
import MapDict from '@config/blocks.json';


interface BlockProps {
  position: Position
  type: string
}

const Block = ({
    position, 
    type,
  }: BlockProps) => {
  return (
    <img 
      className='block' 
      style={{
        left: position.x * symbolSize,
        top: position.y * symbolSize
      }}
      src={`assets/${MapDict[type as keyof typeof MapDict].path}`} 
      alt={ MapDict[type as keyof typeof MapDict].description } 
    />
  )
}

export default Block