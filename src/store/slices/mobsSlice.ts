import { createSlice } from "@reduxjs/toolkit";
import { Position } from "@config/types/Position";
import { RootState } from "@store/index";

export interface MobState {
  position: Position
  hp: number
}

interface MobsState {
  mobs: MobState[]
}

const initialState: MobsState = {
  mobs: []
}

export const mobsSlice = createSlice({
  name: 'mobs',
  initialState,
  reducers: {
    newMob: (state, action) => {
      state.mobs.push(action.payload)
    },
    getDamage: (state, action) => {
      const mob = state.mobs.find((mob) => {        
        return mob.position.x === action.payload.target.position.x && mob.position.y === action.payload.target.position.y
      })
      mob!.hp = mob!.hp - action.payload.damage
      console.log(mob!.hp)
      state.mobs = state.mobs.filter(mob => mob.hp > 0)
    },
  }
})

export const { newMob, getDamage } = mobsSlice.actions

export const selectMobs = (state: RootState) => state.mobs.mobs

export default mobsSlice.reducer