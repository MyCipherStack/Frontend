import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/userAuthSlice';
import adminAuthReducer from "../features/auth/adminAuthSlice"
import timeRuducer from "../features/timerSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  adminAuth:adminAuthReducer,
  timer:timeRuducer
});

export default rootReducer;
