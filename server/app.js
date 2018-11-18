let usersRouter = require('./users')
let dataRouter = require('./data')

// services call
let createApp = (server) => {
  server.use('/users', usersRouter)
  server.use('/data', dataRouter)
}

module.exports = createApp
