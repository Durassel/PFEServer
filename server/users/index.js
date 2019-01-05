const express       = require('express')
const bcrypt        = require('bcrypt')
const uuid          = require('uuid')
const passport      = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const users         = require('./users')
const router        = express.Router()
const saltRounds    = 10 // Used by bcrypt

// Configure passport.js to use the local strategy
passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
  try {
    // Find user in the database
    users.getUserByUsername(username).then(function(user) {
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
  done(null, user.username);
})

// Deserialize a user
passport.deserializeUser((id, done) => {
  try {
    users.getUserByUsername(id).then(res => done(null, res))
  } catch (error) {
    done(error, false)
  }
});

router.get('/logout', async (req, res, next) => {
  if (req.isAuthenticated()) { // Passport logout
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

router.get('/all', async (req, res, next) => {
  try {
    res.send(await users.getAllUsers())
  } catch (err) {
    return next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    res.send(await users.getUserByUserId(req.params.id))
  } catch (err) {
    return next(err)
  }
})

router.get('/team/:name', async (req, res, next) => {
  try {
    let list = await users.getUsersByTeam()
    list = list.filter(x => x.teamID.name == req.params.name) // Keep only 'Team 1' users for example
    res.send(list)
  } catch (err) {
    return next(err)
  }
})

router.get('/jacket/:name', async (req, res, next) => {
  try {
    let list = await users.getUsersByJacket()
    list = list.filter(x => x.jacketID.name == req.params.name) // Keep only 'Jacket 1' user for example
    res.send(list)
  } catch (err) {
    return next(err)
  }
})

router.get('/job/:name', async (req, res, next) => {
  try {
    let list = await users.getUsersByJob()
    list = list.filter(x => x.jobID.name == req.params.name) // Keep only 'member' users for example
    res.send(list)
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

router.post('/add', async (req, res, next) =>{
  try {
    res.send(await users.add(req.body))
  } catch (err) {
    return next(err)
  }
})

router.put('/update', async (req, res, next) =>{
  try {
    res.send(await users.update(req.body))
  } catch (err) {
    return next(err)
  }
})

router.delete('/delete', async (req, res, next) =>{
  try {
    res.send(await users.remove(req.body))
  } catch (err) {
    return next(err)
  }
})

module.exports = router
