import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/state/counterSlice.js'
import todoReducer from './features/state/todoSlice.js'
import { apiSlice } from './features/api/apiSlice.js' // Adjust the path based on your project structure

export const store = configureStore({
  reducer: {
    // connect counterSlice to our reducer
    counter: counterReducer,
    todo: todoReducer,

    // Add the generated reducer as a specific top-level slice
    // these are dynamically named
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})
