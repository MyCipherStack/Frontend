import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/userAuthSlice';
import adminAuthReducer from "../features/auth/adminAuthSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  adminAuth:adminAuthReducer
});

export default rootReducer;
