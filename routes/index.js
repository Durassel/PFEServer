var express = require('express');
const mongoose = require('mongoose')
var router = express.Router();
/* GET home page. */

const fs = require('fs')
router.get('/', function(req, res) {
  	/*router.get('/getuser', function(res) {
		console.log("res: ",res)
		data = res
	})*/
	res.render('index',);
})

module.exports = router;
