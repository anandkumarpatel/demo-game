import './App.css'

import React from 'react'
import { Box } from '@mui/material'

const path = window.location.pathname

const Admin: React.FC = () => {
  return (
    <Box sx={{ width: '100vw', height: '100vh', overflow: 'scroll', gap: '2rem', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
      <button
        className='submit-button'
        onClick={() => {
          fetch('/reset')
        }}
      >
        Reset
      </button>
      <button
        className='submit-button'
        onClick={() => {
          fetch('/solve')
        }}
      >
        Solve
      </button>
    </Box>
  )
}

export default Admin
