let jobsDao = require('./jobs.dao')
let model = require('../model')

async function getAllJobs () {
  	return jobsDao.getAll({})
}

module.exports = {
	getAllJobs
}
