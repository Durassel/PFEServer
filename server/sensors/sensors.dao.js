const mongo = require('../mongo')

async function getAll (data) {
  	return mongo.all("sensors", data)
}

async function set (data) {
  	return mongo.insert("sensors", data)
}

async function update (id, data) {
  	return mongo.update("sensors", id, data)
}

module.exports = {
  	getAll, set, update
}
