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
    }
  }
})

export const { newMob } = mobsSlice.actions

export const selectMobs = (state: RootState) => state.mobs.mobs

export default mobsSlice.reducer