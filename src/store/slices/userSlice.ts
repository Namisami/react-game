import { createSlice } from "@reduxjs/toolkit";
import { Position } from "@config/types/Position";
import { RootState } from "@store/index";

interface UserState {
  position: Position
  eyeDirection: Position
  isBusy: boolean
  isAttack: boolean
}

const initialState: UserState = {
  position: {
    x: 2,
    y: 2,
  },
  eyeDirection: {
    x: 0,
    y: 0,
  },
  isBusy: false,
  isAttack: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    positionChange: (state, action) => {
      state.position = action.payload
    },
    busyChange: (state, action) => {
      state.isBusy = action.payload
    },
    attackChange: (state, action) => {
      state.isAttack = action.payload
    },
    eyeDirectionChange: (state, action) => {
      state.eyeDirection = action.payload
    },
  }
})

export const { positionChange, busyChange, attackChange, eyeDirectionChange } = userSlice.actions

export const selectHero = (state: RootState) => state.user

export default userSlice.reducer