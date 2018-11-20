const express = require('express')
const router = express.Router()
const users = require('./users')

router.get('/', async (req, res, next) => {
  try {
    res.send(await users.getUsers())
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

router.post('/userLogin', async (req, res, next) => {
  try {
    res.send(await users.userLogin(req.body))
  } catch (err) {
    return next(err)
  }
})

router.post('/', async (req, res, next) => {
  let data = req.body

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
    res.send(await users.delUser(req.body.idUser))
  } catch (err) {
    return next(err)
  }
})

module.exports = router
