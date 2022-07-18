import { combineReducers, configureStore } from "@reduxjs/toolkit"
import productsReducer from "./ProductsSlice"
import themeReducer from './ThemeSlice'
import cartReducer from "./CartSlice"
import authenticationReducer from './AuthenticationSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ["products","cart"]
}
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  theme: themeReducer,
  auth:authenticationReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)




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

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 