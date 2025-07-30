import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/userAuthSlice';
import adminAuthReducer from "../features/auth/adminAuthSlice"
import timeReducer from "../features/timerSlice"
import problemReducer from "../features/problemSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  adminAuth:adminAuthReducer,
  timer:timeReducer,
  userProblems:problemReducer
});

export default rootReducer;
