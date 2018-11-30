let usersDao = require('./users.dao')
let model = require('../model')

async function getAllUsers () {
  	return usersDao.getAll({})
}

async function getUsersByJob (data) {
	return usersDao.getAll({ "job" : data })
}

async function getUserByIdGilet (data) {
	return usersDao.get({ "giletid" : data })
}

async function userLogin (data) {
	let res = false
	usersDao.get({ "idUser": data.idUser, "password": data.password }).then((ret) => {
		res = ret
	})

	console.log("Res : " + JSON.stringify(res))
	return res
}

async function addUser (data) {
	let event = model.users({
		idUser   : data.idUser,
		giletid  : data.giletid,
		job      : data.job
	})

	return usersDao.add(event)
}

async function delUser (data) {
  	return usersDao.remove({ idUser : data })
}

async function chgGilet (data) {
 	return usersDao.update({ 'idUser' : data.idUser, 'job' : '1' }, { 'giletid' : data.giletid })
}

async function chgUser (data) {
  	return usersDao.update({ 'idUser' : data.idUser }, { 'giletid' : data.giletid, 'job' : data.job })
}

async function chgPassword (data) {
  	return usersDao.update({ 'idUser' : data.idUser }, { 'password' : data.password })
}

module.exports = {
  getAllUsers, getUsersByJob, getUserByIdGilet, userLogin, addUser, delUser, chgGilet, chgUser, chgPassword
}
