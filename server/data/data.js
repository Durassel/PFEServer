let dataDao = require('./data.dao')
let usersDao = require('../users/users.dao')
let model = require('../model')

async function getData () {
  	return dataDao.getData({})
}

async function getDataByIdUser (id) {
	let data = await dataDao.getAll({ "idUser": id })//.then(function(data) {
	
	for (let i in data) {
		let element = data[i]

		await dataDao.getSensor({ "typeId" : element.typeId }).then(function(elementName) {
			element.typeId = elementName[0].name
		})
	}

	return data
}

async function setData (data) {
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
  getData, getDataByIdUser, setData
}
