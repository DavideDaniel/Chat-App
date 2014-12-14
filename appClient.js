// var WebSocket = require("ws");
var ws = new WebSocket("ws://localhost:3000");



//list of online users to display on the right hand side
var usersOnline = [];

var inset = document.querySelector("div.inset");
var ul = document.querySelector("ul#chat");
var userList = document.querySelector("#users");
var input = document.querySelector("#input");


var userName = false;
// var userColor = false;

ws.addEventListener("open", function(connection){
	console.log("Connected to server.")
	// var object = {
		// userName: false,
		// text: input.value
	// }


});

ws.addEventListener("message", function(msg){
	var parsed = JSON.parse(msg.data);
	// var type = message.type;
	// console.log(message);
	
	// console.log(msg.data);

	var pM = userName+": "+parsed.text;
	// status.text = msg;
	var li = document.createElement( "li" );
    li.innerText = pM;
    ul.insertBefore( li, ul.firstChild );


	}
)

input.addEventListener( "keypress", function (e){
    if ( e.keyCode === 13 )
    {
        ws.send(input.value);
        input.value = "";
    }
} );

// process.stdin.on("data", function (input) {
//       input = input.toString().trim();
//       ws.send(input);
//     });