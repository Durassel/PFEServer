let usersDao = require('./users.dao')
const ApiError = require('../utils/ApiError').ApiError

const getUsers = async () => {
  return usersDao.getUsers()
}

const getUserByIdGilet = async (id) => {
	return usersDao.getUserByIdGilet(id)
}

const userLogin = async (login) => {
  return usersDao.userLogin(login)
}

const addUser = async (data) => {
  return usersDao.addUser(data)
}

const delUser = async (id) => {
  return usersDao.delUser(id)
}

const chgGilet = async (data) => {
  return usersDao.chgGilet(data)
}

const chgUser = async (data) => {
  return usersDao.chgUser(data)
}

const chgPassword = async (data) => {
  return usersDao.chgPassword(data)
}

module.exports = {
  getUsers, getUserByIdGilet, userLogin, addUser, delUser, chgGilet, chgUser, chgPassword
}
