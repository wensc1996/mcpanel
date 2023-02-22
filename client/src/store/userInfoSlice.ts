import { LoginResponse } from './../utils/apis/userApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store';

const initialState: LoginResponse =  {
    userId: 0,
    playerId: '',
    loginIp: '',
    roleId: 0,
    account: ''
}
export const userInfo = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        update: (state: LoginResponse, action: PayloadAction<LoginResponse>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            return action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { update } = userInfo.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUserInfo = (state: RootState) => state.userInfo

export default userInfo.reducer