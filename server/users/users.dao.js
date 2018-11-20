const mongoose = require('mongoose')
const DatabaseConnectionError = require('../utils/DatabaseError').DatabaseConnectionError
const DatabaseRequestError = require('../utils/DatabaseError').DatabaseRequestError
const EmptyResultError = require('../utils/DatabaseError').EmptyResultError

const schema = mongoose.Schema;
const user = new schema({
	idUser   :{type: String, required: true},
	giletid  :{type: String, required: true},
	job  :{type: String, required: true},
	idManager:{type: String, required: false}
})

const modelUser = mongoose.model("users", user);

let getUsers = async () => {
	return new Promise((resolve, reject) => {
	    try {
	    	modelUser.find({"job": "1"}, function (err, data) {
	    		if (data.length < 1) { reject(new EmptyResultError("getUsers")) }
	      		resolve(data)
			})
	    } catch (e) {
	      reject(new DatabaseRequestError("getUsers", e.message))
	    }
	})
}

let userLogin = async (login) => {
	return new Promise((resolve, reject) => {
	    try {
	    	modelUser.findOne({"idUser": login.idUser,"password": login.password}, function (err, data) {
	    		if (data.length < 1) { resolve({"login": false}) }

	      		resolve({"login": /*data[0].job*/true})
			})
	    } catch (e) {
	      reject(new DatabaseRequestError("userLogin", e.message))
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

let chgUser = async (chgData) => {
	return new Promise((resolve, reject) => {
	    try {
	    	modelUser.findOne({"idUser": chgData.idUser,"password": logchgDatain.password}, function (err, chgUser) {
	    		if (chgUser.length === 1) { 
	    			chgUser.password = chgData.password
	    			chgUser.job = chgData.job
	    			chgUser.save(function (err) {
					   if (err) throw err
					})
	    			resolve({"result": "Operation done"})
	    		}
	      		resolve({"result": "error"})
			})
	    } catch (e) {
	      reject(new DatabaseRequestError("userLogin", e.message))
	    }
	})
}

let chgGilet = async (chgData) => {
	return new Promise((resolve, reject) => {
	    try {

	    	modelUser.findOne({"idUser": chgData.idUser,"password": chgData.password}, function (err, event) {
	    		if (!event) {resolve({"result": "Error"})}
	    		else if(event.job === "1"){
	    			event.password = chgData.password
	    			console.log("after: ",event.password)
	    			event.save(function (err) {
					   if (err) throw err
					})
	    			resolve({"result": "Operation done"})
		    	}
		    	else{
		    		resolve({"result": "Operation not allowed"})
		    		
	    		}
	      		
			})
	    } catch (e) {
	      reject(new DatabaseRequestError("userLogin", e.message))
	    }
	})
}

let addUser = async (data) => {
	return new Promise((resolve, reject) => {
	    try {
	        let newUser = new modelUser({
			idUser   : data.idUser,
			giletid  : data.giletid,
			job      : data.job
			/*idManager:{type: String, required: false}*/
			})
	        newUser.save(function(err) {
	          	if (err) { 
	          		reject(new DatabaseRequestError("addUser", err)) }
      			resolve({"result": "The new user has been added."})
	    	})
	    } catch (e) {
	      reject(new DatabaseRequestError("addUser", e.message))
	    }
	})
}

let delUser = async (id) => {
	return new Promise((resolve, reject) => {
	    try {
	    	modelUser.remove({idUser: id}, function (err) {
			  	if (err) { reject(new DatabaseRequestError("addUser", err)) }
      			resolve({"result": "The user has been successfully deleted"})
			})
	    } catch (e) {
	      reject(new DatabaseRequestError("delUser", e.message))
	    }
	})
}
module.exports = {
  getUsers, getUserByIdGilet, userLogin, addUser, delUser, chgGilet, chgUser
}
