var express = require('express');
const mongoose = require('mongoose')
var router = express.Router();

/* GET home page. */

const fs = require('fs')
const schema = mongoose.Schema;
const user = new schema({
	idUser:{type: String, required: true},
	giletid:{type: String, required: true},
	idSuperior:{type: String, required: false},
})
const SensorSchema = new schema({
	x1:{type: String, required: true},
	y1:{type: String, required: true},
	z1:{type: String, required: true},
	x2:{type: String, required: true},
	y2:{type: String, required: true},
	z2:{type: String, required: true}
})
/*const DataSchema = new schema({
	typeId:{type: String, required: true},
	sensor: SensorSchema	
})
const globalSchema = new schema({
	date:{type: String, required: true},
	data:[DataSchema]
})*/
const vestSchema = new schema({
	idUser:{type: String, required: true},
	date:{type: String, required: true},
	typeId:{type: String, required: true},
	sensor:[SensorSchema]
})

const model = mongoose.model("userdata", vestSchema);
const modelUser = mongoose.model("user", user);
router.get('/getUsers', function(req, res) {
	try{
		modelUser.find({}, function (err, data) {
		if (err) {
		   throw err
		}
		res.send({data : data})
		})
	}
	catch(e){
		console.log(e)
		//res.send({data : e})
	}
})
router.get('/getUser/:id', function(req, res) {
	try{
		modelUser.find({"giletid": req.params.id.toString().replace(':','')}, function (err, data) {
		if (err) {
		   throw err
		}
		res.send({data : data})
		})
	}
	catch(e){
		console.log(e)
		//res.send({data : e})
	}
	
})

router.get('/getUserData/:id', function(req, res) {
	console.log(req.params.id)
	try{
		model.find({"idUser": req.params.id.toString().replace(':','')}, function (err, data) {
		if (err) {
		   throw err
		}
		res.send({data : data})
		})
	}
	catch(e){
		console.log(e)
	}
	
})
router.post('/setData', function(req, res) {
    console.log("connected")
	try{
		let giletid =  req.body.giletid
		modelUser.find({"giletid": giletid}, function (err, id) {
			if (err) {
			   throw err
			}
			console.log("data:", req.body)
			req.body.global.forEach(function(global){
				let date = req.body.global.date
				global.data.forEach(function(data){
					let event = new model({idUser : id.idUser,
											date : global.date,
											typeId : data.typeId,
											sensor : data.sensor
											})
					 event.save(function(err){
					 	if (err){
					 		console.log(err)
					 		throw err
					 	}
					 	console.log('saved')
					 })
					//console.log(event)
				})})
			})
	}
	catch(e){
		console.log(e)
		//res.send({data : e})
	}	
	res.send(true);
})


module.exports = router;
