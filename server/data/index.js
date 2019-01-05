const express = require('express')
const router = express.Router()
const data = require('./data')

router.get('/all', async (req, res, next) => {
  try {
    res.send(await data.getAllData())
  } catch (err) {
    return next(err)
  }
})

router.get('/user/:name', async (req, res, next) => {
  try {
    let list = await data.getDataByUser()
    list = list.filter(x => x.userID.username == req.params.name) // Keep only 'Data' from user for example
    res.send(list)
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
