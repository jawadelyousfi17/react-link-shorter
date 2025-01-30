import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/inter';
import { CssVarsProvider } from '@mui/joy';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <CssVarsProvider>
    < App/>
  </CssVarsProvider>
)
