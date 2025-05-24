import { createSlice } from "@reduxjs/toolkit";


interface TimerState{
    startTime:number|null
    isRunning:boolean
}

const initialState:TimerState={
    startTime:null,
    isRunning:false
}


export const timerSlice=createSlice({
    name:"timer",
    initialState,
    reducers:{
        startTimer(state){
            if(!state.isRunning){
                state.startTime=Date.now()
                state.isRunning=true
            }
        },
        resetTimer(state){
            state.startTime=null;
            state.isRunning=false
        }
    }
    
})


export const {resetTimer,startTimer}=timerSlice.actions
export default timerSlice.reducer