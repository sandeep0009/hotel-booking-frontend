
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState{
    user:null | object
}

const initialState:UserState = {
    user:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')!):null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action:PayloadAction<object>)=>{
            state.user=action.payload
            localStorage.setItem('user',JSON.stringify(action.payload))
        },
        removeUser:(state)=>{
            state.user=null
            localStorage.removeItem('user')
        }
    }
})

export const {setUser,removeUser} = userSlice.actions
export default userSlice.reducer;

