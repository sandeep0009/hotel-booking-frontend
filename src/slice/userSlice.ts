import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: number
  name: string
  email: string
  role: string
}

export interface UserState {
  user: User | null
}

const userFromStorage = localStorage.getItem('user')
const initialState: UserState = {
  user: userFromStorage && userFromStorage !== 'undefined' ? JSON.parse(userFromStorage) : null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    removeUser: (state) => {
      state.user = null
      localStorage.removeItem('user')
    }
  }
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer
