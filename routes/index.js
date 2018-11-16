var express = require('express');
const mongoose = require('mongoose')
var router = express.Router();

/* GET home page. */

const fs = require('fs')
const schema = mongoose.Schema;
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
	giletid:{type: String, required: true},
	date:{type: String, required: true},
	typeId:{type: String, required: true},
	sensor:[SensorSchema]
})

const model = mongoose.model("userdata", vestSchema);

router.post('/', function(req, res) {
    //var id = parseInt(req.params.id)
	try{
		console.log("data:", req.body)
		let giletid =  req.body.giletid
	req.body.global(function(global){
		let date = req.body.global.date
		req.body.data(function(data){
			let event = new model({giletid : giletid,
									date : global.date,
									typeId : data.typeId,
									sensor : data.sensor
									})
			//console.log(event, model)

			
			// model.find({}, function(err,data){
			// 	console.log('Err:'+ err)
			// 	console.log('data:'+ data)
			// })

			 event.save(function(err){
			 	if (err){
			 		console.log(err)
			 		throw err
			 	}
			 	console.log('ok')
			 })
			//console.log(event)
		})})


	}
	catch(e){
		console.log(e)
		//res.send({data : e})
	}	
	return
})


module.exports = router;
