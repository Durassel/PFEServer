let dataDao = require('./data.dao')
let usersDao = require('../users/users.dao')
let model = require('../model')

async function getData () {
  	return dataDao.getData()
}

async function getDataByIdUser (id) {
	//return await dataDao.getDataByIdUser(id)
	await dataDao.getDataByIdUser(id).then(function(data) {
		console.log(data)
		for (let i in data) {
			let element = data[i]

			dataDao.getSensor(element.typeId).then(function(elementName) {
				element.typeId = elementName.name
				console.log("element: ",element.typeId)
			})
		}
		console.log(data)
		return data
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
