import { ThemeProvider, createTheme } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'

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
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
