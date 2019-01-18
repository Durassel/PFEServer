const express = require('express')
const router  = express.Router()
const jackets = require('./jackets')

router.get('/all', async (req, res, next) => {
  try {
    res.send(await jackets.getAll())
  } catch (err) {
    return next(err)
  }
})

router.get('/user/:id', async (req, res, next) => {
  try {
    res.send(await jackets.getJacketByUserId(req.params.id))
  } catch (err) {
    return next(err)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    res.send(await jackets.add(req.body))
  } catch (err) {
    return next(err)
  }
})

router.put('/update', async (req, res, next) =>{
  try {
    res.send(await jackets.update(req.body))
  } catch (err) {
    return next(err)
  }
})

router.delete('/delete', async (req, res, next) =>{
  try {
    res.send(await jackets.remove(req.body))
  } catch (err) {
    return next(err)
  }
})

module.exports = router
