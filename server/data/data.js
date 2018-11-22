let dataDao = require('./data.dao')
let usersDao = require('../users/users.dao')
let model = require('../model')

const getData = async () => {
  	return dataDao.getData()
}

const getDataByIdUser = async (id) => {
	return dataDao.getDataByIdUser(id)
}

const setData = async (data) => {
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
