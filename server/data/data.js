let dataDao = require('./data.dao')
let usersDao = require('../users/users.dao')
let model = require('../model')

async function getData () {
  	return dataDao.getData({})
}

async function getDataByIdUser (id) {
	await dataDao.getDataByIdUser({ "idUser": id }).then(async (data) => {
		await dataDao.getSensor({}).then(async (sensors)  => {
			console.log("Get sensor")
			console.log(sensors)

			data.forEach(function(element) {
				sensors.forEach(function(sensor) {
					if (element.typeId === sensor.typeId) {
						console.log("Type id : " + element.typeId + ' / name : ' + sensor.name)
						element.typeId = sensor.name
					}
				})
			})

			console.log("Data : " + JSON.stringify(data))
			return data
		})
	})
}

async function setData (data) {
	let giletid =  data.giletid
	usersDao.getUserByIdGilet(giletid).then(function(id) {
		let idUser =  id.idUser

		data.global.forEach(function(global) {
			let date = data.global.date

			global.data.forEach(function(data) {
				let event = model.data({
					idUser : idUser,
					date : global.date,
					typeId : data.typeId,
					sensors : data.sensors
				})

				return dataDao.setData(event)
			})
		})
	})
}

module.exports = {
  getData, getDataByIdUser, setData
}
