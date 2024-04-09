import React from 'react'

type Props = {
  otherCount: number
  onFinish: (answer: string) => void
  onClick: () => void
}

const COUNT = 350 * 10 // 350 is how many I click per minute. mult this by people we expect to play
const ClickCard: React.FC<Props> = ({ otherCount, onFinish, onClick }) => {
  const [count, setCount] = React.useState(0)
  const c = Math.max(count, otherCount)
  const remainingClicks = Math.max(0, COUNT - c)

  const answer = 'nice work!'
  const isSolved = remainingClicks <= 0
  const question = isSolved ? `ya'll clicked this ${COUNT} times` : `Everyone work together to click this button ${remainingClicks} more times!`
  const inputComponents = (
    <button
      className='submit-button'
      onClick={() => {
        setCount(count + 1)
        if (remainingClicks <= 1) {
          onFinish(answer)
        }
        onClick()
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

export default ClickCard
