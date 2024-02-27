import { combineReducers, configureStore } from '@reduxjs/toolkit'

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

import publicApiSlice from '@features/api/publicApiSlice'
import privateApiSlice from '@features/api/privateApiSlice'
import apiSlice from '@features/api/apiSlice'

import authReducer from '@features/authSlice'

import urlParamsReducer from '@features/urlParamsSlice'
import urlPersistParamsReducer from '@features/urlPersistParamsSlice'
import dataReducer from '@features/dataSlice'

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
  whitelist: ['auth', 'urlPersistParams']
}

const reducers = combineReducers({
  auth: authReducer,
  urlParams: urlParamsReducer,
  urlPersistParams: urlPersistParamsReducer,
  data: dataReducer,
  [publicApiSlice.reducerPath]: publicApiSlice.reducer,
  [privateApiSlice.reducerPath]: privateApiSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  // MW for caching and magic
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
