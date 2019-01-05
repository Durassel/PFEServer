let usersRouter   = require('./users')
let dataRouter    = require('./data')
let jobsRouter    = require('./jobs')
let sensorsRouter = require('./sensors')
let jacketsRouter = require('./jackets')
let teamsRouter   = require('./teams')

// services call
let createApp = (server) => {
	server.use('/users', usersRouter)
  	server.use('/data', dataRouter)
  	server.use('/jobs', jobsRouter)
  	server.use('/sensors', sensorsRouter)
  	server.use('/jackets', jacketsRouter)
  	server.use('/teams', teamsRouter)
}

module.exports = createApp
