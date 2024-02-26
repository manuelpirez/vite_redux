import { render } from '@testing-library/react'

import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
// As a basic setup, import your same slice reducers
import urlParamsReducer from '@features/params/urlParamsSlice.js'
import urlPersistParamsReducer from '@features/params/urlPersistParamsSlice.js'
import publicApiSlice from '@features/api/publicApiSlice.js'
import privateApiSlice from '@features/api/privateApiSlice.js'
import apiSlice from '@features/api/apiSlice.js'
import authReducer from '@features/auth/authSlice.js'

// Additionally, the test code should create a separate Redux store instance for every test, rather than reusing the same store instance and resetting its state. 
// That ensures no values accidentally leak between tests
const reducers = combineReducers({
  auth: authReducer,
  urlParams: urlParamsReducer,
  urlPersistParams: urlPersistParamsReducer,
  [publicApiSlice.reducerPath]: publicApiSlice.reducer,
  [privateApiSlice.reducerPath]: privateApiSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer
})

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: reducers, preloadedState }),
    ...renderOptions
  } = {}
) {
  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
