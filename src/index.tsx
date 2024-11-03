import { ThemeProvider, createTheme } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'
import Admin from './Admin'

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: purple[500],
  //   },
  //   secondary: {
  //     main: green[500],
  //   },
  // },
})
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const isAdmin = window.location.pathname.includes('admin850')
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>{isAdmin ? <Admin /> : <App />}</ThemeProvider>
  </React.StrictMode>
)
