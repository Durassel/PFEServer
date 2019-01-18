let teamsDao = require('./teams.dao')
let usersDao = require('../users/users.dao')
let model    = require('../model')
let mongoose = require('mongoose')

async function getAllTeams () {
  	return teamsDao.getAll({})
}

async function add (data) {
	let team = model.teams({
		name: data.name
	})
	return teamsDao.set(team)
}

async function update (data) {
 	return teamsDao.update({ '_id' : mongoose.Types.ObjectId(data._id) }, { 'name' : data.new })
}

async function remove (data) {
	// Update team of users
 	usersDao.updateAll({ 'teamID' : mongoose.Types.ObjectId(data._id) }, { 'teamID' : undefined })
  	return teamsDao.remove({ "_id": mongoose.Types.ObjectId(data._id) })
}

module.exports = {
  getAllTeams, add, update, remove
}
