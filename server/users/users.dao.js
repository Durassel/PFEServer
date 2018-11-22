const mongo = require('../mongo')

async function getUsers () {
  	return mongo.all("users", {})
}

async function getUserByIdGilet (data) {
  	return mongo.get("users", data)
}

async function userLogin (data) {
  	return mongo.get("users", data)
}

async function chgUser (id, data) {
  	return mongo.update("users", id, data)
}

async function chgGilet (id, data) {
  	return mongo.update("users", id, data)
}

async function addUser (data) {
  	return mongo.insert("users", data)
}

async function delUser (data) {
  	return mongo.remove("users", data)
}

async function chgPassword (id, data) {
  	return mongo.update("users", id, data)
}

module.exports = {
  getUsers, getUserByIdGilet, userLogin, addUser, delUser, chgGilet, chgUser, chgPassword
}
