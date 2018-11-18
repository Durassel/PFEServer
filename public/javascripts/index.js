$.get('/getUsers', function(res) {
	console.log("getUsers: ",res)	
}).then(data =>{
	data.data.forEach(function(id){
		let user = "<li>"+
			"<p>User: "+id.idUser+"</p>"+
			"<p>Gilet: "+id.giletid+"</p>"+
			"<button value='Users' type='button' onclick='getUserData(`"+id.idUser+"`)'>get more informations</button>"
			"</li>"
		$("#users").append(user)
	})
}) 	

function getUserData(id){
	$.get('/getUserData/:'+id, function(res) {
		console.log("user data to show:", res)	
	}).then(data =>{
		$("#user h3").remove()
		$("#user p").remove()
		$("#user").append($("<h3></h3>").text("User data:"))
		data.data.forEach(function(global){
			let values = "<p>Date: "+ global.date +"<p>"+
						 "<p>Sensor: "+ global.typeId +"</p>"
			global.sensor.forEach(function(element){
				console.log(element)
				values += "<p>"+element+"</p>"
			})
			console.log("sensor: ", global.sensor)
			$("#user").append(values)
		})
		
	}) 	
}