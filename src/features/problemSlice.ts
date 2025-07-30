import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface IProblem { id: string, code: string,language:string }


const initialState= {
    problems: [] as IProblem[]
}


const userProblemSlice = createSlice({
    name: "userProblem",
    initialState,
    reducers: {
        addProblem(state, action: PayloadAction<IProblem>) {

            const index = state.problems.findIndex((obj) => obj.id == action.payload.id && obj.language==action.payload.language)
            if (index == -1) {
                state.problems.push(action.payload)
            } else {
                state.problems[index].code = action.payload.code
            }
        },

        removeProblem(state, action: PayloadAction<IProblem>) {
            
            console.log(action.payload.language,action.payload.id,"remove problem");

            state.problems = state.problems.filter(obj => (obj.id != action.payload.id || obj.language!==action.payload.language))

            
        }
    }
})


export const {addProblem,removeProblem}=userProblemSlice.actions

export default userProblemSlice.reducer