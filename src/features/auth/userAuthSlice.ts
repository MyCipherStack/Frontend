import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface User {
    id: string
    email: string
    name: string
}

interface AuthState {
    isLoggedIn: boolean;
    user:User | null;
}

    const initialState:AuthState= {
        isLoggedIn: false,
        user: null
    }

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<User>) {
            state.isLoggedIn = true,
                state.user = action.payload
        },
        logOut(state) {
            state.isLoggedIn = false,
                state.user = null
        }
    }
})

export const { loginSuccess, logOut } = authSlice.actions
export default authSlice.reducer