const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

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
    res.send('reset')
  })

  app.get('/health', (req, res) => {
    res.send('ok')
  })

  app.get('/solve', (req, res) => {
    state.solved = true
    io.to('all').emit('solve')
    res.send('solved')
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
    console.log(socket.id, 'New client connected. Total connections:', io.sockets.sockets.size)

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

    socket.on('click', (event) => {
      console.log('click', event)
      const state = get()
      save('click', (state.click || 0) + 1)
      io.to('all').emit('completed', get())
    })

    socket.on('disconnect', () => {
      console.log(socket.id, 'Client disconnected. Total connections:', io.sockets.sockets.size)
    })
  })

  server.listen(port, () => console.log(`Listening on port http://localhost:${port}`))
}

main().catch(console.error)
