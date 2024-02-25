import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import { persistor, store } from '@/store.js'
import { PersistGate } from 'redux-persist/integration/react'

import theme from './theme.js'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import App from './App.jsx'
import TranslationProvider from '@components/TranslationProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* If you are using react, wrap your root component with PersistGate. 
    This delays the rendering of your app's UI until your persisted state has been retrieved and saved to redux. 
    NOTE the PersistGate loading prop can be null, or any react instance, e.g. loading={<Loading />} */}
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={<div />}>
        <TranslationProvider>
          <ThemeProvider theme={theme}>
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
