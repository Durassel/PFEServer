let usersDao     = require('./users.dao')
let jacketsDao   = require('../jackets/jackets.dao')
let dataDao      = require('../data/data.dao')
let model        = require('../model')
let mongoose     = require('mongoose')
let bcrypt       = require('bcrypt')
const saltRounds = 10 // Used by bcrypt

async function getAllUsers () {
  	return usersDao.getAll({})
}

async function getUserByUserId (data) {
	return usersDao.get({ "_id" : mongoose.Types.ObjectId(data) })
}

async function getUserByUsername (data) {
	return usersDao.join(model.modelUser, { "username" : data }, { a: "jobID", b: "teamID", c: "" })
}

async function getAllUsersData () {
	return usersDao.join(model.modelUser, {}, { a: { path: 'jobID', populate: { path: 'jobID', model: model.modelJob } }, b: { path: 'teamID', populate: { path: 'teamID', model: model.modelTeam } }, c: "" })
}

async function add (data) {
	bcrypt.hash(data.password, saltRounds).then(function(hash) {
		let user = model.users({
			username: data.username,
			password: hash,
			teamID  : data.teamID,
			jobID   : data.jobID
		})

		return usersDao.set(user)
	});
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
  getAllUsers, getUserByUserId, getUserByUsername, getAllUsersData, add, update, remove
}
