const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const https = require('https')

const port = process.env.PORT || 4001

const app = express()
const state = {}

async function main() {
  function save(question, answer) {
    state[question] = answer
  }

  function get() {
    return state
  }

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    return next()
  })

  app.get('/reset', (req, res) => {
    Object.keys(state).forEach((key) => {
      delete state[key]
    })
    res.send('ok')
  })

  app.use(express.static('build'))

  const server = http.createServer(app)

  const io = socketIo(server, {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  })

  io.on('connection', (socket) => {
    console.log(socket.id, 'New client connected')

    const data = get()
    console.log('sending init', data)
    socket.emit('init', data)

    socket.join('all')

    socket.on('complete', (event) => {
      console.log('complete', event)
      save(event.question, event.answer)
      const state = get()
      io.to('all').emit('completed', state)
    })

    socket.on('disconnect', () => {
      console.log(socket.id, 'Client disconnected')
    })
  })

  server.listen(port, () => console.log(`Listening on port http://localhost:${port}`))
}

main().catch(console.error)
