let usersDao   = require('./users.dao')
let jacketsDao = require('../jackets/jackets.dao')
let dataDao    = require('../data/data.dao')
let model      = require('../model')
let mongoose   = require('mongoose')

async function getAllUsers () {
  	return usersDao.getAll({})
}

async function getUserByUserId (data) {
	return usersDao.get({ "_id" : mongoose.Types.ObjectId(data) })
}

async function getUserByUsername (data) {
	return usersDao.get({ "username" : data })
}

async function getUsersByTeam () {
	return usersDao.join(model.modelUser, { a: "jobID", b: "teamID", c: "" })
}

async function getUsersByJacket () {
	return usersDao.join(model.modelUser, { a: "jobID", b: "teamID", c: "" })
}

async function getUsersByJob () {
	return usersDao.join(model.modelUser, { a: "jobID", b: "teamID", c: { path: 'userID', model: model.modelJacket } })
}

async function add (data) {
	let user = model.users({
		username: data.username,
		password: data.password,
		teamID  : data.teamID,
		jobID   : data.jobID
	})

	return usersDao.set(user)
}

async function update (data) {
	// To do : update password if not null / undefined
 	return usersDao.update({ '_id' : mongoose.Types.ObjectId(data._id) }, { 'username' : data.username, 'teamID' : mongoose.Types.ObjectId(data.teamID), 'jobID' : mongoose.Types.ObjectId(data.jobID) })
}

async function remove (data) {
	// Delete all data / jacket related to the user
	jacketsDao.remove({ 'userID': mongoose.Types.ObjectId(data._id) })
	dataDao.remove({ 'userID': mongoose.Types.ObjectId(data._id) })
  	return usersDao.remove({ "_id": mongoose.Types.ObjectId(data._id) })
}

module.exports = {
  getAllUsers, getUserByUserId, getUserByUsername, getUsersByTeam, getUsersByJacket, getUsersByJob, add, update, remove
}
