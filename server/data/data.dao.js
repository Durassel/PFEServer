const mongo = require('../mongo')
const usersDao = require('../users/users.dao')

async function getData () {
  	return await mongo.all("data", {})
}

async function getDataByIdUser (id) {
	console.log("id: ",id)
  	return await mongo.all("data", {"idUser": id})
}

async function getSensor (typeId) {
  	return mongo.all("sensors", { "typeId" : typeId })
}

async function setData (data) {
  	return mongo.insert("data", data)
}

module.exports = {
  getData, getDataByIdUser, setData, getSensor
}
