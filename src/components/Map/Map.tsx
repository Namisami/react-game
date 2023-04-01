import React, { useState, useRef, useEffect } from 'react';
import Attack from '@components/Attack/Attack';

import Npc from '@components/Characters/Npc/Npc';
import Player from '@components/Characters/Player/Player';
import Dialog from '@components/Dialog/Dialog';
import Monster from '@components/Monster/Monster';

import './Map.css';

import MapDict from '@config/blocks.json';
import MapObject from '@config/map.json';
const gameMap: { position: number[], type: string }[] = MapObject.map;
// import MobDict from '@config/mobs.json';

// const gameMap = [
//   ["w", "w", "w", "w", "w", "w", "w", "w"],
//   ["w", "f", "f", "f", "w", "f", "m", "w"],
//   ["w", "f", "f", "f" ,"f", "f", "f", "w"],
//   ["w", "w", "f", "f" ,"w", "f", "n", "w"],
//   ["w", "w", "f", "f" ,"w", "w", "f", "w"],
//   ["w", "w", "w", "w", "w", "w", "w", "w"]
// ]

export interface Position {
  x: number;
  y: number;
}

const Map = () => {
  const [hero, setHero] = useState(
    {
      position: {
        x: 2,
        y: 2,
      },
      isBusy: false,
      isAttack: false,
    }
  );

  const [mobs, setMobs] = useState([])

  const position = useRef<Position>(hero.position)
    
  useEffect(() => {
    position.current = hero.position
  }, [hero.position])

  const generatedMobs = () => {
    return (
      <Monster 
        position={{
          x: 6,
          y: 1
        }}
      />
    )
  }

  // const collideCheck = ({x, y}: Position) => {
  //   return gameMap[y][x]=== 'w' || gameMap[y][x]=== 'n' || gameMap[y][x] === 'm' ? true : false
  // };

  // const interactCheck = () => {
  //   if (
  //     // Position check
  //     (gameMap[hero.position.y + 1][hero.position.x] === 'n' ||
  //     gameMap[hero.position.y + 1][hero.position.x] === 'n' ||
  //     gameMap[hero.position.y - 1][hero.position.x + 1] === 'n' ||
  //     gameMap[hero.position.y - 1][hero.position.x - 1] === 'n' ||
  //     gameMap[hero.position.y][hero.position.x + 1] === 'n' ||
  //     gameMap[hero.position.y][hero.position.x - 1] === 'n') &&
  //     // Busy check
  //     (!hero.isBusy &&
  //     !hero.isAttack)
  //     ) {
  //     setHero({ ...hero, position: position.current, isBusy: true })
  //   }
  // }

  const attack = () => {
    // Need to check more on abuse
    if (hero.isAttack) {
      return
    }
    setHero({ ...hero, isAttack: true })
    const timeoutId = setTimeout(() => {
      setHero({ ...hero, position: position.current, isAttack: false });
      clearTimeout(timeoutId)
    }, 1000)
  }

  // const heroPositionChange = ({x, y}: Position) => {
  //   if (hero.isBusy) {
  //     return
  //   }
  //   const newPosition = {
  //     x: hero.position.x + x,
  //     y: hero.position.y + y,
  //   }
  //   if (!collideCheck(newPosition)) {
  //     setHero({ ...hero, position: {x: newPosition.x, y: newPosition.y}, })
  //   }
  // };

  

  const renderBlocks = gameMap.map((block) => {
    const [x, y] = block.position;
    const blockType = block.type;
    return (
      <img key={`${x}${y}`} 
        className='block' 
        style={{
          left: x * 25,
          top: y * 25
        }}
        src={`assets/${MapDict[blockType as keyof typeof MapDict].path}`} 
        alt={ MapDict[blockType as keyof typeof MapDict].description } 
      />
    )
    // return (
    //   // Key must be NOT index; just for test
    //   <div key={ y } className='row'>
    //     { row.map((block: string, x: number) => {
    //       return (
    //         <React.Fragment key={ `row${x}` }>
    //           { block === "n" &&
    //             <Npc
    //               position={{
    //                 x,
    //                 y
    //               }}
    //             />
    //           } 
    //           { block === "m" &&
    //             <Monster 
    //               position={{
    //                 x,
    //                 y
    //               }}
    //             />
    //           }
    //           <img 
    //             className='block' 
    //             src={`assets/${MapDict[block as keyof typeof MapDict].path}`} 
    //             alt={ MapDict[block as keyof typeof MapDict].description } 
    //           />
    //         </React.Fragment>
    //       )
    //     })}
    //   </div>
    // )
  })
  
  return (
    <>
      <div className='map'>
        { renderBlocks }
        {/* <Player 
          heroPosition={ hero }
          onPlayerMove={ ({x, y}) => heroPositionChange({x, y}) }
          onInteract={ interactCheck }
          onAttack={ attack }
        /> */}
        { hero.isAttack &&
          <Attack 
            position={ hero.position }
          />
        }
      </div>
      { hero.isBusy &&
        <Dialog onEndBtnClick={ () => setHero({ ...hero, 'isBusy': false }) }/>
      }
    </>
  )
}

export default Map;