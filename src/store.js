import { combineReducers, configureStore } from '@reduxjs/toolkit'

import publicApiSlice from '@features/api/publicApiSlice.js'
import privateApiSlice from '@features/api/privateApiSlice.js'
import apiSlice from '@features/api/apiSlice.js'
import authReducer from '@features/auth/authSlice.js'

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore
} from 'redux-persist'
import { CookieStorage } from 'redux-persist-cookie-storage'
import Cookies from 'cookies-js'
import { storageOpts } from '@config'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage:
    storageOpts.type === 'cookies'
      ? new CookieStorage(Cookies, {
          setCookieOptions: {
            domain: storageOpts.domain
          }
        })
      : storage,
  whitelist: ['auth']
}

const reducers = combineReducers({
  auth: authReducer,
  [publicApiSlice.reducerPath]: publicApiSlice.reducer,
  [privateApiSlice.reducerPath]: privateApiSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(
      publicApiSlice.middleware,
      privateApiSlice.middleware,
      apiSlice.middleware
    ),
  devTools: import.meta.env.MODE !== 'production'
})
export const persistor = persistStore(store)
