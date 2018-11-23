const mongo = require('../mongo')

async function getSensor (data) {
  	return mongo.all("sensors", data)
}

module.exports = {
  getSensor
}
