let dataDao = require('./data.dao')
const ApiError = require('../utils/ApiError').ApiError

const getData = async () => {
  	return dataDao.getData()
}

const getDataByIdUser = async (id) => {
	//return await dataDao.getDataByIdUser(id)
	try {
		let data = await dataDao.howTo(id)
		for (let i in data) {
				let element = data[i]
				const elementName = await dataDao.getSensor(element.typeId)
				element.typeId = elementName.name
				console.log("element: ",element.typeId)
			}
			console.log(data)
			return data
	} catch(e) {
    		if (e instanceof EmptyResultError) { 
    			// return pas de results
    		}
		throw e 
	}	
}

const setData = async (data) => {
	return dataDao.setData(data)
}

module.exports = {
  getData, getDataByIdUser, setData
}
