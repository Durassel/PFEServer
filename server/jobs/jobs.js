let jobsDao = require('./jobs.dao')
let model = require('../model')

async function getAllJobs () {
  	return jobsDao.getAll({})
}

async function getJobsByLevelLessThan (id) {
	return jobsDao.getAll({ level: {$lte: id} })
}

module.exports = {
	getAllJobs, getJobsByLevelLessThan
}
