import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Attack from '@components/Attack/Attack';
import Player from '@components/Characters/Player/Player';
import Dialog from '@components/Dialog/Dialog';
import Monster from '@components/Monster/Monster';
import Block from '@components/Block/Block'

// import MobDict from '@config/mobs.json';
import { Position } from '@config/types/Position';
import { symbolSize } from '@config/variables/variables';
import { gameMap } from '@utils/loadMap';
import { gameNpcs } from '@utils/loadNpcs';
import { loadMobs } from '@utils/loadMobs';
import {
  busyChange,
} from '@store/slices/userSlice'
import { selectHero } from '@store/slices/userSlice';
import { selectMobs } from '@store/slices/mobsSlice';
import { MobState } from '@store/slices/mobsSlice'

import './Map.css';
import CharacterCreator from '@components/Characters/CharacterCreator/CharacterCreator';


const Map = () => {
  const dispatch = useDispatch()
  const hero = useSelector(selectHero)
  const mobs = useSelector(selectMobs)
  
  const position = useRef<Position>(hero.position)
  
  useEffect(() => {
    position.current = hero.position
  }, [hero.position])

  useEffect(() => {
    loadMobs()
  }, [])

  const renderBlocks = Array.from(gameMap).map(([blockPosition, { type: blockType }]) => {
    let [x, y] = blockPosition.split(',').map(el => parseInt(el));
    return (
      <Block 
        key={`${x}${y}`}
        position={{x, y}}
        type={ blockType }
      />
    )
  })
  
  const renderNpcs = Array.from(gameNpcs).map(([npcPosition]) => {
    let [x, y] = npcPosition.split(',').map(el => parseInt(el));
    return (
      <CharacterCreator
        key={`${x}${y}_npc`} 
        position={{x, y}} 
      >
        {({position}) => 
          <Npc
            position={ position }
          />
        }
      </CharacterCreator>
    )
  })

  const renderMobs = mobs.map((mob: MobState) => {
    const {x, y} = mob.position
    return (
      <CharacterCreator
        key={`${x}${y}_mob`} 
        position={{x, y}}
      >
        {({position, attack}) =>
          <Monster 
            position={ position }
            onAttack={ ({x, y}) => attack({x, y}) }
          />
        }
      </CharacterCreator>
    )
  })

  return (
    <>
      <div className='map'>
        { renderBlocks }
        { renderNpcs }
        { renderMobs }
        <CharacterCreator
          position={ hero.position }
          isBusy={ hero.isBusy }
          isPlayer={ true }
        >
          {({position, isBusy, move, interact, attack}) => 
            <Player 
              position={ position }
              isBusy={ isBusy }
              onMove={ ({x, y}) => move({x, y}) }
              onInteract={ interact }
              onAttack={ ({x, y}) => attack({x, y}) }
            />
          }
        </CharacterCreator>
        { hero.isAttack &&
          <Attack 
            position={{ 
              x: hero.position.x * symbolSize + symbolSize / 3 + hero.eyeDirection.x, 
              y: hero.position.y * symbolSize + hero.eyeDirection.y 
            }}
          />
        }
      </div>
      { hero.isBusy &&
        <Dialog onEndBtnClick={ () => dispatch(busyChange(false))}/>
      }
    </>
  )
}

export default Map;