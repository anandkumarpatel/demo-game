import { FunctionComponent } from 'react'

const IntoCard: FunctionComponent = () => {
  return (
    <div className='title-card'>
      <h1>Its Game Time!</h1>
      <p className='quiz-info'>
        Type the answers to the questions in the boxes. If you (or anyone else) type the answer correctly, the box will turn change. Answers can be entered on any phone and in any
        order. The number on the right tells you how long the word is. Good luck!
      </p>
    </div>
  )
}

export default IntoCard
