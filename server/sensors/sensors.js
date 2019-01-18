let sensorsDao = require('./sensors.dao')
let model = require('../model')
let mongoose = require('mongoose')

async function getAll () {
  	return sensorsDao.getAll({})
}

async function add (data) {
	let sensor = model.sensors({
		type: data.name,
		active: true
	})
	return sensorsDao.set(sensor)
}

async function update (data) {
 	return sensorsDao.update({ '_id' : mongoose.Types.ObjectId(data._id) }, { 'type' : data.new })
}

module.exports = {
	getAll, add, update
}
