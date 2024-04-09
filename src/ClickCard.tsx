import React from 'react'

type Props = {
  question: string
  answer: string
  initRes?: number
  onFinish: (answer: string) => void
}

const QACard: React.FC<Props> = ({ initRes = 0, onFinish }) => {
  const [count, setCount] = React.useState(initRes)

  const question = 'Click this button 1000 times'
  const answer = 'Nice Work!'
  const isSolved = count >= 1000
  const inputComponents = (
    <button
      className='submit-button'
      onClick={() => {
        setCount(count + 1)
      }}
    >
      Click!
    </button>
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
