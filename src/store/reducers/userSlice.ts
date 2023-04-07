import { createSlice } from "@reduxjs/toolkit";
import { Fragment } from "react";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    position: {
      x: 2,
      y: 2,
    },
    isBusy: false,
    isAttack: false,
  },
  reducers: {
    positionChange: (state, action) => {
      state.position = action.payload
    }
  }
})

export const { positionChange } = userSlice.actions

export default userSlice.reducer