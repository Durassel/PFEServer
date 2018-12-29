const express = require('express')
const router = express.Router()
const jobs = require('./jobs')

router.get('/all', async (req, res, next) => {
  try {
    res.send(await jobs.getAllJobs())
  } catch (err) {
    return next(err)
  }
})

module.exports = router
