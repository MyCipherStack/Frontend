import {configureStore} from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist";


const persistConfiq={
    key:"root",
    storage
}
const persistedReducer=persistReducer(persistConfiq,rootReducer)


export const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({serializableCheck:false}),
    
})



export const persistor =persistStore(store)



// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

