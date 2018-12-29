const express       = require('express')
const bcrypt        = require('bcrypt')
const uuid          = require('uuid')
const passport      = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const users         = require('./users')
const router        = express.Router()
const saltRounds    = 10 // Used by bcrypt

// Configure passport.js to use the local strategy
passport.use(new LocalStrategy({ usernameField: 'idUser' }, (idUser, password, done) => {
  try {
    // Find user in the database
    users.getUserByIdUser(idUser).then(function(user) {
      if (user === null) {
        return done(null, false);
      } else {
        // Compare passwords
        bcrypt.compare(password, user.password, function(err, res) {
          if (res) {
            return done(null, user); // User authenticated
          } else {
            return done(null, false);
          }
        })
      }
    })
  } catch (error) {
    done(error)
  }
}))

// Serialize a user
passport.serializeUser((user, done) => {
  done(null, user.idUser);
})

// Deserialize a user
passport.deserializeUser((id, done) => {
  try {
    users.getUserByIdUser(id).then(res => done(null, res))
  } catch (error) {
    done(error, false)
  }
});

router.get('/logout', async (req, res, next) => {
  if (req.isAuthenticated()) {
    // Passport logout
    req.logout()
    res.send(true)
  } else {
    res.send(false)
  }
})

router.get('/authrequired', async (req, res, next) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    res.send(true)
  } else {
    res.send(false)
  }
})

router.get('/', async (req, res, next) => {
  try {
    res.send(await users.getUsersByJob("1"))
  } catch (err) {
    return next(err)
  }
})

router.get('/all', async (req, res, next) => {
  try {
    res.send(await users.getAllUsers())
  } catch (err) {
    return next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    res.send(await users.getUserByIdGilet(req.params.id))
  } catch (err) {
    return next(err)
  }
})

router.post('/login', async (req, res, next) => {
  if (!req.isAuthenticated()) {
    passport.authenticate('local', await function(err, user, info) {
      req.login(user, (err) => {
        return res.send(user)
      })
    }) (req, res, next)
  } else {
    res.send(false)
  }
})

router.post('/addUser', async (req, res, next) =>{
  try {
    res.send(await users.addUser(req.body))
  } catch (err) {
    return next(err)
  }
})

router.put('/chgGilet', async (req, res, next) =>{
  try {
    res.send(await users.chgGilet(req.body))
  } catch (err) {
    return next(err)
  }
})

router.put('/chgUser', async (req, res, next) =>{
  try {
    res.send(await users.chgUser(req.body))
  } catch (err) {
    return next(err)
  }
})

router.delete('/delUser', async (req, res, next) =>{
  try {
    res.send(await users.delUserById(req.body))
  } catch (err) {
    return next(err)
  }
})

router.put('/chgPassword', async (req, res, next) =>{
  try {
    res.send(await users.chgPassword(req.body))
  } catch (err) {
    return next(err)
  }
})

module.exports = router
