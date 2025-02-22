// Jai Shree Ram

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "../public/css/fonts.css"
import { BrowserRouter } from 'react-router'
import { SupabaseProvider } from './context/SupabaseContext.jsx'

createRoot(document.getElementById('root')).render(
  <SupabaseProvider>
    <BrowserRouter>    
      <App />
    </BrowserRouter>
  </SupabaseProvider>,
)
