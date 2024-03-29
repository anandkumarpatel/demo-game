import { FunctionComponent } from 'react'
import { BasicPaper } from './styles'
import { Typography } from '@mui/material'

const IntoCard: FunctionComponent = () => {
  return (
    <div className='title-card'>
      <h1>You want the shoes?</h1>
      <p className='quiz-info'>
        You have 1 hour to discover the code and find the key! Let's see if Nancy's Family & Friends have what it takes! Type the answers to the questions in the boxes. If you type
        the answer correctly, the box will turn green. Answers can be entered on any phone and in any order. The number on the right tells you how long the word is. Good luck!
      </p>
    </div>
  )
}

export default IntoCard
