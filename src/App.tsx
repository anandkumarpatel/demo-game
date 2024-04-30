import './App.css'

import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { Manager } from 'socket.io-client'
import ClickCard from './ClickCard'
import FinalCard from './FinalCard'
import IntoCard from './IntroCard'
import QACard from './QACard'

let socket: any = null
const questions = [
  { question: "what's my favorite indian restaurant in san francisco?", answer: 'Mela' },
  { question: 'in the video on my youtube channel, event-driven architecture can promote rapid what?', answer: 'prototYping' },
  { question: 'find alejandro. ask him what country he is from.', answer: 'argentina' },
  { question: 'my second instagram post contains glasses made by what company?', answer: 'snaPchat' },
  { question: 'find jorge and adk him what he is known for.', answer: 'laugH' },
  { question: "the two precious stones on the sides of nancy's wedding ring refer to houses in school?", answer: 'hOgwarts' },
  { question: 'find my elementary school friend and get his last name.', answer: 'kesayaN' },
  { question: 'find anton. ask him what country he is from.', answer: 'ukrainE' },
  { question: 'find suhag and purvi and ask them what town they are from.', answer: 'mcrae' },
  { question: 'what is my dj name?', answer: 'fAze' },
  { question: "what is the name of my family's pet bird?", answer: 'Ramu' },
  { question: 'what color shirt is my snapchat avatar wearing?', answer: 'whitE' },
  { question: 'find bob. what is his real name?', answer: 'Ashish' },
  { question: 'in what country was my facebook profile picture?', answer: 'ireland' },
  { question: 'i got a flat tire on the way to what meetup? (check my twitter)', answer: 'doCker' },
  { question: 'what fraternity was i in?', answer: 'aiO' },
  { question: 'my mixes on soundcloud are measured in?', answer: 'Degrees' },
  { question: 'i like sharing knowledge via fun what? (check my linkedin)', answer: 'newslEtters' },
]
const isLocal = window.location.hostname.includes('localhost')
const port = isLocal ? '4001' : '443'
const backendUrl = `${window.location.protocol}//${window.location.hostname}:${port}`

function App() {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [clickDone, setClickDone] = useState(false)
  const [clickEnabled, setClickEnabled] = useState(false)
  useEffect(() => {
    // const manager = new Manager(`${window.location.hostname}:4001`)
    const manager = new Manager(backendUrl)
    socket = manager.socket('/') // main namespace
    manager.on('reconnect', () => {
      console.log('reconnected')
      setClickEnabled(true)
    })
    manager.on('reconnect_error', () => {
      console.log('reconnect_error')
      setClickEnabled(false)
    })
    manager.on('reconnect_failed', () => {
      console.log('reconnect_failed')
      setClickEnabled(false)
    })
    function solve() {
      setClickDone(true)
      setAnswers(
        questions.reduce(
          (p, c) => {
            p[c.question] = c.answer
            return p
          },
          {
            click: 100000,
          } as Record<string, any>
        )
      )
    }
    socket.on('solve', solve)

    socket.on('completed', (e: Record<string, string>) => {
      setClickEnabled(true)
      console.log('completed', e)

      if (e.from !== socket.id) {
        if (!e.click || answers.click > e.click) {
          e.click = answers.click
        }
        return setAnswers({
          ...answers,
          ...e,
        })
      }
    })

    socket.on('init', (e: Record<string, string>) => {
      if (e.solved) return solve()
      setClickEnabled(true)
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

  const isSolved = (!clickEnabled || clickDone) && Object.keys(answers).length >= questions.length + 1 // +1 for click
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
              setAnswers({
                ...answers,
                [question]: a,
              })
              socket.emit('complete', {
                from: socket.id,
                question,
                answer: a,
              })
            }}
          />
        )
      })}
      <ClickCard
        // @ts-ignore
        otherCount={answers.click || 0}
        onFinish={() => setClickDone(true)}
        onClick={() => {
          socket.emit('click', {
            from: socket.id,
          })
        }}
      />
      {isSolved ? <FinalCard /> : null}
    </Box>
  )
}

export default App
