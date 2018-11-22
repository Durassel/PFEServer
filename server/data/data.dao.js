const mongo = require('../mongo')
const usersDao = require('../users/users.dao')

async function getData () {
  	return mongo.all("data", {})
}

async function getDataByIdUser (id) {
  	return mongo.all("data", {"idUser": id})
}

async function setData (data) {
  	return mongo.insert("data", data)
}

module.exports = {
  getData, getDataByIdUser, setData
}