const express = require('express')
const router = express.Router()
const sensors = require('./sensors')

router.get('/all', async (req, res, next) => {
  try {
    res.send(await sensors.getAll())
  } catch (err) {
    return next(err)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    res.send(await sensors.add(req.body))
  } catch (err) {
    return next(err)
  }
})

router.put('/update', async (req, res, next) =>{
  try {
    res.send(await sensors.update(req.body))
  } catch (err) {
    return next(err)
  }
})

module.exports = router
