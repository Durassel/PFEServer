const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('./server/utils/logger')
const mongoose = require('mongoose')
const errorHandler = require('./server/utils/errors').errorHandler

require('dotenv').config()

let app = express()

// Database connection
mongoose.connect('mongodb://localhost/pfe', { useNewUrlParser: true })
let database = mongoose.connection;
database.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
database.once('open', function (){
   console.log("Connecté à la base de données");
});

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

app.listen(process.env.WEB_PORT || 3005 , () => {
  console.log(`App is listening on port ${process.env.WEB_PORT}`)
})
