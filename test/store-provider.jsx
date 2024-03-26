import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

import publicApiSlice from '@features/api/publicApiSlice'
import privateApiSlice from '@features/api/privateApiSlice'
import apiSlice from '@features/api/apiSlice'

export const setupStore = (reducers, preloadedState) => {
  const rootReducer = combineReducers({
    ...reducers
  })
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        publicApiSlice.middleware,
        privateApiSlice.middleware,
        apiSlice.middleware
      )
  })
}

export const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    reducers = {},
    store = setupStore(reducers, preloadedState),
    ...renderOptions
  } = {}
) => {
  // eslint-disable-next-line react/prop-types
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  )
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
