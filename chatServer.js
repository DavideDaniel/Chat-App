var WebSocketServer = require ("ws").Server;
var wsServer = new WebSocketServer({port: 3000});

//random color generator for user colors
var r = Math.floor( Math.random() * ( 255 - 100 ) );
var g = Math.floor( Math.random() * ( 255 - 100 ) );
var b = Math.floor( Math.random() * ( 255 - 100 ) );
var rgb = "rgb(" + r + ", " + g + ", " + b + ")"

//empty array for chat history
var chatHistory = [];
//user database
var userDB = [];


wsServer.on("connection", function (connection) {
	
	//user name is preliminarily set to false(anonymous)
	var userName = false;
	var userColor = rgb;
	var	index = userDB.push(connection)-1;
	// console.log(userDB)

	// console.log("New client connected")
	connection.send(JSON.stringify("Welcome... Pick your name"))

	if (chatHistory.length > 0) {
		
		connection.send(chatHistory)	
		userDB.forEach(function(user){
			user.send(chatHistory)
		})
	}


	connection.on("message", function(msg){
		if (userName===false){
			userName = msg;
			// userDB.forEach(function(users){
			// users.send(JSON.stringify(msg + " has entered the chat"));
			
			// })

			
		}

		// create user object and record messages 
		else {
			// console.log(userName+": "+msg);
			var user = {
				text: msg,
				name: userName,
				color: userColor,
				client: connection
			}
			//push entire object to record chat history each time a message is sent
			chatHistory.push(user);
			// chatHistory = chatHistory.slice(-100);


			for (var i = 0; i < userDB.length; i++) {
				userDB[i].send(user.text)
			};

			


		}
	})

	
//not working currently
	connection.on("close", function (close) {
		// if (userName!== false){
			// console.log(userName + " has disconnected.");
			userDB.splice(index, 1);
	// }

	})

});
//send message function to json
// var sendMsg = function (name, msg, color, time) {
// 	se
// }