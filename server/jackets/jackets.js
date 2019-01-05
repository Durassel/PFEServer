let jacketsDao = require('./jackets.dao')
let model      = require('../model')
let mongoose   = require('mongoose')

async function getAll () {
  	return jacketsDao.getAll({})
}

async function getJacketByUserId (data) {
	return jacketsDao.get({ "userID" : mongoose.Types.ObjectId(data) })
}

async function add (data) {
	let jacket = model.jackets({
		userID    : mongoose.Types.ObjectId(data.userID),
		identifier: data.identifier
	})
	return jacketsDao.set(jacket)
}

async function update (data) {
 	return jacketsDao.update({ '_id' : mongoose.Types.ObjectId(data._id) }, { 'userID' : mongoose.Types.ObjectId(data.userID) })
}

async function remove (data) {
  	return jacketsDao.remove({ '_id' : mongoose.Types.ObjectId(data._id) })
}

module.exports = {
	getAll, getJacketByUserId, add, update, remove
}
