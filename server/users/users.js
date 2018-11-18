let usersDao = require('./users.dao')
const ApiError = require('../utils/ApiError').ApiError

const getUsers = async () => {
  return usersDao.getUsers()
}

const getUserByIdGilet = async (id) => {
	return usersDao.getUserByIdGilet(id)
}

module.exports = {
  getUsers, getUserByIdGilet
}
