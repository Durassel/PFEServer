let dataDao  = require('./data.dao')
let usersDao = require('../users/users.dao')
let model    = require('../model')

async function getAllData () {
  	return dataDao.getAll({})
}

async function getDataByUser () {
	return dataDao.join(model.modelData, {}, { a: { path: 'sensorID', populate: { path: 'typeID', model: model.modelSensor } }, b: "", c: "" })
}

async function set (data) {
	let giletid = data.giletid
	usersDao.getAll({ "giletid" : giletid }).then(function(id) {
		let idUser = id.idUser

		data.global.forEach(function(global) {
			let date = data.global.date

			global.data.forEach(function(data) {
				let event = model.data({
					idUser : idUser,
					date : global.date,
					typeId : data.typeId,
					sensors : data.sensors
				})

				return dataDao.set(event)
			})
		})
	})
}

module.exports = {
  getAllData, getDataByUser, set
}
