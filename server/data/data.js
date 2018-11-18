let dataDao = require('./data.dao')
const ApiError = require('../utils/ApiError').ApiError

const getData = async () => {
  	return dataDao.getData()
}

const getDataByIdUser = async (id) => {
	return dataDao.getDataByIdUser(id)
}

const setData = async (data) => {
	return dataDao.setData(data)
}

module.exports = {
  getData, getDataByIdUser, setData
}
