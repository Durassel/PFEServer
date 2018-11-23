const mongo = require('../mongo')
const usersDao = require('../users/users.dao')

async function getAll (data) {
  	return await mongo.all("data", data)
}

async function getSensor (data) {
  	return mongo.all("sensors", data)
}

async function set (data) {
  	return mongo.insert("data", data)
}

module.exports = {
  getAll, set, getSensor
}
