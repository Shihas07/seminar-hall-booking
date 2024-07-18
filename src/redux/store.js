
import { combineReducers,configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../slice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 



const persistConfig={
   key:"root",
   storage,
}

const rootReducer=combineReducers({
  booking:bookingReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

  
export const store=configureStore({
  reducer: persistedReducer,

})


export const persister=persistStore(store)