const express = require('express')
const router  = express.Router()
const teams   = require('./teams')

router.get('/all', async (req, res, next) => {
  try {
    res.send(await teams.getAllTeams())
  } catch (err) {
    return next(err)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    res.send(await teams.add(req.body))
  } catch (err) {
    return next(err)
  }
})

router.put('/update', async (req, res, next) =>{
  try {
    res.send(await teams.update(req.body))
  } catch (err) {
    return next(err)
  }
})

router.delete('/delete', async (req, res, next) =>{
  try {
    res.send(await teams.remove(req.body))
  } catch (err) {
    return next(err)
  }
})

module.exports = router
