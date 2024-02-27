import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import { persistor, store } from '@/store.js'
import { PersistGate } from 'redux-persist/integration/react'

import { brand } from '@config'
import getTheme from '@theme/getTheme'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import TranslationProvider from '@components/providers/TranslationProvider'

import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* PersistGate.  delays the rendering of your app's UI until your persisted state has been retrieved and saved to redux.
    NOTE the PersistGate loading prop can be null, or any react instance, e.g. loading={<Loading />} */}
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={<div />}>
        <TranslationProvider>
          <ThemeProvider theme={getTheme(brand)}>
            <CssBaseline />
            <BrowserRouter>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </TranslationProvider>
      </Suspense>
    </PersistGate>
  </Provider>
)
