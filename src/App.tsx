import { Box, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import './App.css'
import IntoCard from './IntroCard'
import QACard from './QACard'
import FinalCard from './FinalCard'
import socketIOClient from 'socket.io-client'

let socket: any = null
function App() {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  useEffect(() => {
    socket = socketIOClient(`${window.location.hostname}:4001`)
    // socket = socketIOClient(`http://localhost:4001`)
    socket.on('completed', (e: Record<string, string>) => {
      if (e.from !== socket.id) {
        return setAnswers({
          ...answers,
          ...e,
        })
      }
    })

    socket.on('init', (e: Record<string, string>) => {
      console.log('init', e)
      if (e) {
        return setAnswers({
          ...answers,
          ...e,
        })
      }
    })
    return () => {
      socket.disconnect()
    }
  }, [])

  const theme = useTheme()
  const questions = [
    { question: 'At which company has Akhil spent most of his professional life?', answer: 'vmWare' },
    { question: "You should wish a very Happy Birthday today to which of Akhil's friends?", answer: 'madHav' },
    { question: "Find any of Akhil's friends or family members who went to Georgia Tech and ask them to complete this phrase: To hell with…?", answer: 'gEorgia' },
    { question: "Akhil's friend Anand developed this devious but brilliant game! Anand started his career at which popular AI chip company?", answer: 'Nvidia' },
    { question: "In Akhil's Facebook profile picture, what is the brand of his jacket?", answer: 'nIke' },
    { question: 'Find Chris and ask him who he thinks is the best basketball team on the face of the planet.', answer: 'piStons' },
    { question: 'Priya, Vishu, Nikhil, and Akhil once missed a train trying to get to which PNW city?', answer: 'portlaNd' },
    { question: 'Gunan was a recent contestant on which popular TV game show?', answer: 'jEopardy' },
    { question: "What is Amu's real name?", answer: 'miHir' },
    { question: 'What is the first name of the comedian that Neha and Akhil watched on their first date?', answer: 'hAsan' },
    { question: 'Where in Montana did Akhil coach soccer?', answer: 'misSoula' },
    { question: 'Lesly, Akhil, and Amu once camped outside to save money while attending the world cup in which country?', answer: 'Brazil' },
    { question: "Which 'corner' Colorado city is Maddie from?", answer: 'Durango' },
    { question: 'Akhil has 3 friends with the same name. What is their name? Hint: they are all Ismaili', answer: 'Ali' },
    { question: "What is Tina's profession?", answer: 'lawYer' },
  ]
  console.log('answers', answers)
  const isSolved = Object.keys(answers).length === questions.length
  return (
    <Box sx={{ width: '100vw', height: '100vh', overflow: 'scroll' }}>
      <IntoCard />
      {questions.map(({ question, answer }) => {
        return (
          <QACard
            key={question}
            question={question}
            answer={answer}
            initRes={answers[question]}
            onFinish={(a) => {
              console.log('onFinish')
              setAnswers({
                ...answers,
                [question]: a,
              })
              console.log('emitting')
              socket.emit('complete', {
                from: socket.id,
                question,
                answer: a,
              })
              console.log('emitted')
            }}
          />
        )
      })}
      {isSolved ? <FinalCard /> : null}
    </Box>
  )
}

export default App
