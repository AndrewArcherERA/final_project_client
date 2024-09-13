import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import consumerReducer from './src/features/user/consumerSlice'

const rootReducer = combineReducers({
    consumer: consumerReducer,
    supplier: supplierReducer,
    employee: employeeReducer,
    inventory: inventoryReducer, // only store logged in users specific inventory, query for supplier inventory
})

export const store = configureStore({
    reducer: rootReducer
})