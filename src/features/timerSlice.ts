import { createSlice } from "@reduxjs/toolkit";


interface TimerState {
    startTime: number | null
    isRunning: boolean,
    challengeIds: string |null

}

const initialState: TimerState = {
    startTime: null,
    isRunning: false,
    challengeIds:null
}


export const timerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        startTimer(state, data) {


            if (!state.isRunning) {
                state.startTime = Date.now()
                state.isRunning = true
            }
            else if (state.isRunning && state.challengeIds!=data.payload) {
                state.challengeIds=data.payload
                console.log("timer payload", data.payload)

                state.startTime = Date.now()
                state.isRunning = true

            }
        },
        resetTimer(state) {
            state.startTime = null;
            state.isRunning = false
        }
    }

})


export const { resetTimer, startTimer } = timerSlice.actions
export default timerSlice.reducer