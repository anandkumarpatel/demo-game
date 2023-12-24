import { useState } from 'react'
import './App.css'
import logo from './logo.svg'
import { Box, Button, Card, CardContent, Container, InputAdornment, Paper, Stack, TextField, Typography, styled, useTheme } from '@mui/material'
import QACard from './QACard'
import IntoCard from './IntroCard'

function App() {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const theme = useTheme()
  const questions = [
    {
      question: "what's my favorite indian restaurant in san francisco?",
      answer: 'Mela',
    },
    {
      question: 'in the video on my youtube channel, event-driven architecture can promote rapid what?',
      answer: 'prototYping',
    },
    {
      question: 'find alejandro. ask him what country he is from.',
      answer: 'argentina',
    },
    {
      question: 'my second instagram post contains glasses made by what company?',
      answer: 'snaPchat',
    },
    {
      question: 'find jorge and adk him what he is known for.',
      answer: 'laugH',
    },
    {
      question: "the two precious stones on the sides of nancy's wedding ring refer to houses in school?",
      answer: 'hOgwarts',
    },
    {
      question: 'find my elementary school friend and get his last name.',
      answer: 'kesayaN',
    },
    {
      question: 'find anton. ask him what country he is from.',
      answer: 'ukrainE',
    },
    {
      question: 'find suhag and purvi and ask them what town they are from.',
      answer: 'mcrae',
    },
    {
      question: 'what is my dj name?',
      answer: 'fAze',
    },
    {
      question: "what is the name of my family's pet bird?",
      answer: 'Ramu',
    },
    {
      question: 'what color shirt is my snapchat avatar wearing?',
      answer: 'whitE',
    },
    {
      question: 'find bob. what is his real name?',
      answer: 'Ashish',
    },
    {
      question: 'in what country was my facebook profile picture?',
      answer: 'ireland',
    },
    {
      question: 'i got a flat tire on the way to what meetup? (check my twitter)',
      answer: 'doCker',
    },
    {
      question: 'what fraternity was i in?',
      answer: 'aiO',
    },
    {
      question: 'my mixes on soundcloud are measured in?',
      answer: 'Degrees',
    },
    {
      question: 'i like sharing knowledge via fun what? (check my linkedin)',
      answer: 'newslEtters',
    },
  ]

  return (
    <Box sx={{ width: '100vw', height: '100vh', overflow: 'scroll' }}>
      <IntoCard />
      {questions.map(({ question, answer }) => {
        return (
          <QACard
            question={question}
            answer={answer}
            onFinish={(a) =>
              setAnswers({
                ...answers,
                [question]: a,
              })
            }
          />
        )
      })}
    </Box>
  )
}

export default App
