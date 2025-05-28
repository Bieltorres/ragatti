import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.scss'
import { App } from './App'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Redux/store";
import './config/fontawesome';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
)
