$.get('/getuser', function(res) {
	console.log("getuser: ",res)	
}).then(data =>{
	data.data.forEach(function(id){
		let user = "<li>"+
			"<p>User: "+id.idUser+"</p>"+
			"<p>Gilet: "+id.giletid+"</p>"+
			"<button value='Users' type='button' onclick='getUserData("+id.giletid+")'>get more informations</button>"
			"</li>"
		$("#users").append(user)
	})
}) 	

function getUserData(id){
	$.get('/getUserData/:'+String(id), function(res) {
		console.log("user data to show:", res)	
	}).then(data =>{
		$("#user").append($("<h3></h3>").text("User data:"))
		data.data.forEach(function(global){
			$("#user").append($("<p></p>").text("here will be present all the data of a line: "+global.toString()))
		})
		
	}) 	
}