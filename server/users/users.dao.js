const mongoose = require('mongoose')
const DatabaseConnectionError = require('../utils/DatabaseError').DatabaseConnectionError
const DatabaseRequestError = require('../utils/DatabaseError').DatabaseRequestError
const EmptyResultError = require('../utils/DatabaseError').EmptyResultError

const schema = mongoose.Schema;
const user = new schema({
	idUser   :{type: String, required: true},
	giletid  :{type: String, required: true},
	idManager:{type: String, required: false}
})

const modelUser = mongoose.model("users", user);

let getUsers = async () => {
	return new Promise((resolve, reject) => {
	    try {
	    	modelUser.find({}, function (err, data) {
	    		if (data.length < 1) { reject(new EmptyResultError("getUsers")) }
	      		resolve(data)
			})
	    } catch (e) {
	      reject(new DatabaseRequestError("getUsers", e.message))
	    }
	})
}

let getUserByIdGilet = async (id) => {
	return new Promise((resolve, reject) => {
	    try {
	    	modelUser.findOne({"giletid": id}, function (err, data) {
	    		if (data.length < 1) { reject(new EmptyResultError("getUserByIdGilet")) }
	      		resolve(data)
			})
	    } catch (e) {
	      reject(new DatabaseRequestError("getUserByIdGilet", e.message))
	    }
	})
}

module.exports = {
  getUsers, getUserByIdGilet
}
