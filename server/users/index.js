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

router.post('/', async (req, res, next) => {
  let data = req.body

})

module.exports = router
