import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './router/routes.jsx'
import { Toaster } from 'react-hot-toast'
import { AppContextProvider } from './AppContext/Appcontext.jsx'
import { toastconfig } from './services/toastconfig.js'


createRoot(document.getElementById('root')).render(
  <>
    <AppContextProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" toastOptions={toastconfig} reverseOrder={false} />
    </AppContextProvider>
  </>
)
