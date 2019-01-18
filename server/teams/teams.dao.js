const mongo = require('../mongo')

async function getAll (data) {
  	return mongo.all("teams", data)
}

async function set (data) {
  	return mongo.insert("teams", data)
}

async function update (id, data) {
  	return mongo.update("teams", id, data)
}

async function remove (data) {
  	return mongo.remove("teams", data)
}

module.exports = {
  	getAll, set, update, remove
}
