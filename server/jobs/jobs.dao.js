const mongo = require('../mongo')

async function getAll (data) {
  	return mongo.all("jobs", data)
}

module.exports = {
  	getAll
}
