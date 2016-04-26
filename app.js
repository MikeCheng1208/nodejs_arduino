var express = require("express");
var path = require("path");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);




/*控制Arduino套件*/
var five = require("johnny-five");
/*抓取Arduino版子*/
var board = new five.Board({port:'COM4'});

//////////////////////////////////////////////////////////////////

app.use(express.static(path.join(__dirname,"/app")));

//////////////////////////////////////////////////////////////////


/*
                  _       _
    /\           | |     (_)
   /  \   _ __ __| |_   _ _ _ __   ___
  / /\ \ | '__/ _` | | | | | '_ \ / _ \
 / ____ \| | | (_| | |_| | | | | | (_) |
/_/    \_\_|  \__,_|\__,_|_|_| |_|\___/

*/
var led = null;
var servo = null;
var proximity = null;
var joystick
board.on("ready", function() {
	
	/*LED燈*/
    led = new five.Led(13);

	//==============================================

	/*Servo馬達*/
	servo = new five.Servo(10);
	this.repl.inject({
	    servo: servo
	});

	//==============================================

	/*超音波 HC-SR04*/
	proximity = new five.Proximity({
		controller: "HCSR04",
		pin: 7
	});

	proximity.on("data", function() {
		// console.log("  cm  : ", this.cm);
		// console.log("  in  : ", this.in);
		// console.log("-----------------");
	});

	proximity.on("change", function() {

		//控制超音波(socket回傳)
	    io.emit('prox',{
			cm: this.cm,
			in: this.in
		})	

	});
	// ==============================================

	//控制香菇頭
	joystick = new five.Joystick({
		pins: ["A0", "A1"],
	});
	joystick.on("change", function(data) {
		io.emit('joystick',{
			x: this.x,
			y: this.y
		})
	});

});

/*
                _        _
               | |      | |
 ___  ___   ___| | _____| |_
/ __|/ _ \ / __| |/ / _ \ __|
\__ \ (_) | (__|   <  __/ |_
|___/\___/ \___|_|\_\___|\__|

*/

io.on('connection', function (socket) {

	//控制LED燈
    socket.on('light-Bulb', function(data) {  
    	if(led){
			if(data["light"]=="ON"){
		    	led.on();
			}else if(data["light"]=="OFF"){
				led.off()
			}
    	} 
    });

	//控制Servo馬達 
    socket.on('Servo', function(data) {  
    	if(servo){
			if(data["deg"]=="180"){
				//最大角度
				servo.max();
			}else if(data["deg"]=="0"){
				//最小角度
		    	servo.min();
			}else if(data["deg"]=="auto"){
				//指定角度
				servo.to( data["int"] );
			}
    	} 
    });

    
});

server.listen(3000);

