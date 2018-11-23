const mongo = require('../mongo')

async function getAll (data) {
  	return mongo.all("sensors", data)
}

module.exports = {
  	getAll
}
