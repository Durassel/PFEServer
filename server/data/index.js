const express = require('express')
const router = express.Router()
const data = require('./data')

router.get('/', async (req, res, next) => {
  try {
    res.send(await data.getData())
  } catch (err) {
    return next(err)
  }
})

router.get('/:id', async (req, res, next) => {
	try {
    res.send(await data.getDataByIdUser(req.params.id))
	} catch (err) {
    return next(err)
  }
})

router.post('/set', async (req, res, next) => {
  try {
    res.send(await data.setData(req.body))
  } catch(err){
    return next(err)
  } 
})

module.exports = router
