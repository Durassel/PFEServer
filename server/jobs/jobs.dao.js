const mongo = require('../mongo')

async function getJob (data) {
  	return mongo.all("jobs", data)
}

module.exports = {
  getJob
}
