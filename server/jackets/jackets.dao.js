const mongo = require('../mongo')

async function getAll (data) {
  	return mongo.all("jackets", data)
}

async function get (data) {
  	return mongo.get("jackets", data)
}

async function set (data) {
  	return mongo.insert("jackets", data)
}

async function update (id, data) {
  	return mongo.update("jackets", id, data)
}

async function remove (data) {
  	return mongo.remove("jackets", data)
}

module.exports = {
  	getAll, get, set, update, remove
}
