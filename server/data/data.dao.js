const mongo = require('../mongo')
const usersDao = require('../users/users.dao')

async function getData (data) {
  	return await mongo.all("data", data)
}

async function getDataByIdUser (data) {
  	return await mongo.all("data", data)
}

async function getSensor (data) {
  	return mongo.all("sensors", data)
}

async function setData (data) {
  	return mongo.insert("data", data)
}

module.exports = {
  getData, getDataByIdUser, setData, getSensor
}
