let dataDao    = require('./data.dao')
let jacketsDao = require('../jackets/jackets.dao')
let sensorsDao = require('../sensors/sensors.dao')
let model      = require('../model')

async function getAllData () {
  	return dataDao.getAll({})
}

async function getDataByUser () {
	return dataDao.join(model.modelData, {}, { a: { path: 'sensorID', populate: { path: 'typeID', model: model.modelSensor } }, b: "", c: "" })
}

async function set (obj) {
	// Maybe use await to avoid nested instruction
	jacketsDao.get({ "identifier": obj.id }).then(function(res) {
		let userID = res.userID
		obj.global.forEach(function(global) { // Loop on each date
			global.data.forEach(function(data) { // Loop on each sensor data
				sensorsDao.get({ "code": data.code }).then(function(res) {
					let event = model.data({
						sensorID: res._id,
						userID: userID,
						date: global.date,
						coordinates: data.sensors
					})
					return dataDao.set(event)
				})
			})
		})
	})
}

module.exports = {
  getAllData, getDataByUser, set
}
