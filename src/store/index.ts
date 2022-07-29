import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage'
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

import CertificatesReducer from "./CertificatesSlice"
import QualityPolicyReducer from "./QualityPolicySlice"
import productsReducer from "./ProductsSlice"
import themeReducer from './ThemeSlice'
import cartReducer from "./CartSlice"
import authenticationReducer from './AuthenticationSlice'
import OfficesReducer from "./OfficesSlice"
import OrdersReducer from "./OrdersSlice"


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ["products","cart","certificates","qualityPolicy","offices","orders"]
}
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders:OrdersReducer,
  theme: themeReducer,
  auth:authenticationReducer,
  certificates:CertificatesReducer,
  qualityPolicy:QualityPolicyReducer,
  offices:OfficesReducer,
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