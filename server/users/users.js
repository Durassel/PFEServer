let usersDao = require('./users.dao')
let model = require('../model')

async function getUsers () {
  	return usersDao.getUsers()
}

async function getUserByIdGilet (data) {
	return usersDao.getUserByIdGilet({ "giletid" : data })
}

async function userLogin (data) {
  	return usersDao.userLogin({ "idUser": data.idUser, "password": data.password })
}

async function addUser (data) {
	let event = model.users({
		idUser   : data.idUser,
		giletid  : data.giletid,
		job      : data.job
	})

	return usersDao.addUser(event)
}

async function delUser (data) {
  	return usersDao.delUser({idUser: data})
}

async function chgGilet (data) {
 	return usersDao.chgGilet({ 'idUser' : data.idUser, 'job' : '1' }, { 'giletid' : data.giletid })
}

async function chgUser (data) {
  	return usersDao.chgUser({ 'idUser' : data.idUser }, { 'giletid' : data.giletid, 'job' : data.job })
}

async function chgPassword (data) {
  	return usersDao.chgPassword({ 'idUser' : data.idUser }, { 'password' : data.password })
}

module.exports = {
  getUsers, getUserByIdGilet, userLogin, addUser, delUser, chgGilet, chgUser, chgPassword
}
