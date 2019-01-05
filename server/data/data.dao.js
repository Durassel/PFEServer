const mongo = require('../mongo')

async function getAll (data) {
  	return mongo.all("data", data)
}

async function get (data) {
  	return mongo.get("data", data)
}

async function update (id, data) {
  	return mongo.update("data", id, data)
}

async function set (data) {
  	return mongo.insert("data", data)
}

async function remove (data) {
  	return mongo.remove("data", data)
}

async function join (model, data) {
  	return mongo.join("data", model, data)
}

module.exports = {
  	getAll, get, update, set, remove, join
}