import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/theme.css'
import './styles/global.css'

// Entry point for the React app.
// Here we attach React to the HTML page and wrap
// the whole app with BrowserRouter so we can use
// React Router for page navigation.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
