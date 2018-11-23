const mongo = require('../mongo')

async function getAll (data) {
  	return mongo.all("users", data)
}

async function get (data) {
  	return mongo.get("users", data)
}

async function update (id, data) {
  	return mongo.update("users", id, data)
}

async function add (data) {
  	return mongo.insert("users", data)
}

async function remove (data) {
  	return mongo.remove("users", data)
}

module.exports = {
  getAll, get, update, add, remove
}
