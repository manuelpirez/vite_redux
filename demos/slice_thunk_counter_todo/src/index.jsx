import ReactDOM from 'react-dom/client'
import './index.css'

import App from './App.jsx'

// help us connecting our redux store to our react app
// works with react context API
import { Provider } from 'react-redux'
import { store } from './store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
