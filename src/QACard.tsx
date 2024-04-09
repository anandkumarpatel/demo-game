import { Box, InputAdornment, TextField } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

type Props = {
  question: string
  answer: string
  initRes?: string
  onFinish: (answer: string) => void
}

const QACard: React.FC<Props> = ({ question, answer, initRes = '', onFinish }) => {
  const [currentInput, setAnswerText] = React.useState(initRes)
  const [isWrong, setIsWrong] = React.useState(false)
  const isSolved = currentInput.toLowerCase() === answer.toLowerCase() || initRes.toLowerCase() === answer.toLowerCase()
  let helperText = ''
  if (isWrong) {
    helperText = 'Nope, try again'
    if (currentInput.length !== answer.length) {
      helperText = `Answer is too short. Hint: you need ${answer.length} letters`
    }
  }
  const inputComponents = (
    <>
      <TextField
        className='input-wrapper'
        value={currentInput}
        onChange={(e) => {
          setIsWrong(false)
          setAnswerText(e.target.value)
          if (e.target.value.toLowerCase() === answer.toLowerCase()) {
            onFinish(answer)
          }
        }}
        InputProps={{
          inputProps: {
            className: 'input-field',
            maxLength: answer.length,
          },
          endAdornment: (
            <InputAdornment position='start'>
              <Box sx={{ backgroundColor: grey }}>{answer.length - currentInput.length}</Box>
            </InputAdornment>
          ),
        }}
        id='outlined-basic'
        // label='Outlined'
        helperText={helperText}
        autoComplete='false'
        error={isWrong}
      />
      <button
        className='submit-button'
        onClick={() => {
          if (currentInput === answer) {
            onFinish(answer)
          } else {
            setIsWrong(true)
          }
        }}
      >
        Guess
      </button>
    </>
  )
  const solvedComponent = <div className='answer-div '>{answer}</div>

  return (
    <div className='question-card'>
      <p>{question}</p>
      {isSolved ? solvedComponent : inputComponents}
    </div>
  )
}

export default QACard
