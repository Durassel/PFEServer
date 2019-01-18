const express      = require('express')
const session      = require('express-session')
const FileStore    = require('session-file-store')(session)
const cookieParser = require('cookie-parser');
const uuid         = require('uuid')
const morgan       = require('morgan')
const helmet       = require('helmet')
const bodyParser   = require('body-parser')
const passport     = require('passport');
const cors         = require('cors')
const logger       = require('./server/utils/logger')
const errorHandler = require('./server/utils/errors').errorHandler
const mqtt         = require('mqtt')
const gateway      = mqtt.connect('mqtt://192.168.43.147')
const data         = require('./server/data/data')

require('dotenv').config()

let app = express()
let options = { // Enable CORS calls from client
  origin: 'http://' + process.env.LOCAL + ':' + process.env.CLIENT_PORT,
  credentials: true
}

app.use(morgan('dev', { 'stream': logger.stream }))
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(options))
app.use(express.static('data/images'))
app.use(cookieParser())
app.use(session({ // Session configuration
  genid: (req) => {
    return uuid()
  },
  store: new FileStore(), // Local storage (sessions folder)
  secret: 'Vkot0taDLBARR8MnLWjR', // Session id hash
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: false,
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 // Expiration time (1 day)
  }
}))
// Passport initialization (authentication)
app.use(passport.initialize())
app.use(passport.session())

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
  gateway.subscribe('data/set')
})

gateway.on('message', (topic, message) => {
  switch (topic) {
    case 'data/set':
    	return data.set(JSON.parse(message.toString('utf8')))
  }
  console.log('No handler for topic %s', topic)
})

