import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist/es/constants"
import userSlice from './features/user/userSlice';
import cartSlice from "./features/user/cartSlice";
import ordersSlice from './features/user/ordersSlice';

const rootReducer = combineReducers({
    user: userSlice,
    cart: cartSlice,
    orders: ordersSlice
})

const persistConfig = {
    key: 'fpRoot',
    storage,
    whitelist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})


export const persistor = persistStore(store)