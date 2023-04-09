import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@store/slices/userSlice'
import mobsReducer from '@store/slices/mobsSlice'

const store = configureStore({
  reducer : {
    user: userReducer,
    mobs: mobsReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export default store