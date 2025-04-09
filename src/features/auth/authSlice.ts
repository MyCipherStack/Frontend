import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState={
    isLoggedIn:false,
    user:null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginSuccess(state,action:PayloadAction<any>){
            state.isLoggedIn=true,
            state.user=action.payload
        },
        logOut(state){
            state.isLoggedIn=false,
            state.user=null
        }
    }
})

export const {loginSuccess,logOut}=authSlice.actions
export default authSlice.reducer