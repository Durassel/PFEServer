let usersDao = require('./users.dao')
let model    = require('../model')
let mongoose = require('mongoose')

async function getAllUsers () {
  	return usersDao.getAll({})
}

async function getUsersByJob (data) {
	return usersDao.getAll({ "job" : data })
}

async function getUserByIdGilet (data) {
	return usersDao.get({ "giletid" : data })
}

async function getUserByIdUser (data) {
	return usersDao.get({ "idUser" : data })
}

async function login (data) {
	return usersDao.get({ "idUser": data.idUser, "password": data.password })
}

async function addUser (data) {
	let event = model.users({
		idUser   : data.idUser,
		giletid  : data.giletid,
		job      : data.job
	})

	return usersDao.add(event)
}

async function delUserById (data) {
  	return usersDao.remove({ "_id": mongoose.Types.ObjectId(data.id) })
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
  getAllUsers, getUsersByJob, getUserByIdGilet, getUserByIdUser, login, addUser, delUserById, chgGilet, chgUser, chgPassword
}
