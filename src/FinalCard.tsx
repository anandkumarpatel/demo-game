import { FunctionComponent } from 'react'
import { BasicPaper } from './styles'
import { Typography } from '@mui/material'

const FinalCard: FunctionComponent = () => {
  return (
    <div className='title-card'>
      <h1>Now Open the Lock!</h1>
      <p className='quiz-info'>The lock code has something to do with CaPiTalS</p>
    </div>
  )
}

export default FinalCard
