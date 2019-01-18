const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('./server/utils/logger')
const errorHandler = require('./server/utils/errors').errorHandler
const mqtt = require('mqtt')
const gateway = mqtt.connect('mqtt://192.168.43.147')
const data = require('./server/data/data')

require('dotenv').config()

let app = express()

app.use(morgan('dev', { 'stream': logger.stream }))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static('data/images'))

// Call app routers
require('./server/app')(app)

app.use('/', async (req, res) => {
  res.end('App is running')
})

// Call error handlers
app.use(errorHandler)

app.listen(process.env.WEB_PORT, () => {
  console.log(`App is listening on port ${process.env.WEB_PORT}`)
})


gateway.on('connect', () => {
  gateway.subscribe('gilet/setData')
})

gateway.on('message', (topic, message) => {
  switch (topic) {
    case 'gilet/setData':
    	return data.setData(/*JSON.stringify(*/JSON.parse(message.toString('utf8')))
  }
  console.log('No handler for topic %s', topic)
})

