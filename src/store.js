import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userSlice from './features/user/userSlice'

const rootReducer = combineReducers({
    user: userSlice
})

export const store = configureStore({
    reducer: rootReducer
})