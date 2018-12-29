let usersRouter   = require('./users')
let dataRouter    = require('./data')
let jobRouter    = require('./jobs')

// services call
let createApp = (server) => {
	server.use('/users', usersRouter)
  	server.use('/data', dataRouter)
  	server.use('/jobs', jobRouter)
}

module.exports = createApp
