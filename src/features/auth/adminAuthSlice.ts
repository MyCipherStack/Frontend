import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState={
    isLoggedIn:false,
    admin:null
}

const adminAuthSlice=createSlice({
    name:"adminAuth",
    initialState,
    reducers:{
        adminLoginSuccess(state,action:PayloadAction<any>){
            state.isLoggedIn=true,
            state.admin=action.payload
        },
        AdminLogOut(state){
            state.isLoggedIn=false,
            state.admin=null
        }
    }
})

export const {adminLoginSuccess,AdminLogOut}=adminAuthSlice.actions
export default adminAuthSlice.reducer