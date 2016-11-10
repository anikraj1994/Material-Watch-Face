var rocky = require('rocky');

rocky.on('draw', function(event) {
  // Get the CanvasRenderingContext2D object
  var ctx = event.context;
	var d = new Date();

  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // Determine the width and height of the display
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;

	ctx.fillStyle = 'red';
	ctx.fillRect(0,0,w,h);
	
	// Draw a full circle outline
ctx.strokeStyle = 'black';
// ctx.lineWidth = 1;
// 	var iniarc=0;
// 	var multiplier=35;
// 	for(var i=1;i<=multiplier;i++){
// 		if(i%2==0){
// 			ctx.beginPath();
// 			ctx.arc(w/2, h/2,w/2-10, iniarc, i*((2 * Math.PI)/multiplier), false);
// 			ctx.stroke();}
		
// 		iniarc=i*((2 * Math.PI)/multiplier);
// 	}
	ctx.lineWidth = 2;
	ctx.beginPath();
			ctx.arc(w/2, h/2,w/2-10, 0, 2 * Math.PI, false);
ctx.stroke();
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'black';
		//var iniarc=0;
	var multiplier=d.getSeconds()/2;
	var angle=0;
	for(var i=1;i<=multiplier;i++){
			angle=fractionToRadian(i/multiplier);
			ctx.beginPath();
			ctx.arc(w/2+ ((w/2-10)/2) * Math.sin(angle), h/2- ((w/2-10)/2) * Math.cos(angle),(w/2-10)/2, 0, 2 * Math.PI, false);
			ctx.stroke();
	}

//   // Current date/time
  var minuteFraction = (d.getMinutes()) / 60;
  var minuteAngle = fractionToRadian(minuteFraction);
	var xx = w/2 + (w/2-10) * Math.sin(minuteAngle);
	var yy = h/2 - (w/2-10) * Math.cos(minuteAngle);
	
	//ctx.strokeStyle = 'black';
//ctx.beginPath();
	ctx.fillStyle = 'black';
ctx.rockyFillRadial(xx, yy,0,10, 0, 2 * Math.PI);
//ctx.rockyFillRadial();
	
	
//   // Set the text color
   ctx.fillStyle = 'white';

//   // Center align the text
  // ctx.textAlign = 'center';

//   // Display the time, in the middle of the screen
	ctx.font="49px Roboto-subset";
ctx.fillText(d.getHours() % 12, w / 2 - ctx.measureText(d.getHours() % 12).width/2, h / 2 - ctx.measureText(d.getHours() % 12).height/2 - ctx.measureText("pm").height/2 , w/2-10);
 	ctx.font="21px Roboto";
	if(d.getHours()>=12)ctx.fillText("pm",  w / 2 - ctx.measureText("pm").width/2,   h/2 - ctx.measureText("pm").width/2 + ctx.measureText(d.getHours() % 12).height/2+3, w/2-10);
	else ctx.fillText("AM",w/2,h/2,w);
});

rocky.on('secondchange', function(event) {
  // Display a message in the system logs
  console.log("Another minute with your Pebble!");

  // Request the screen to be redrawn on next pass
  rocky.requestDraw();
});

function fractionToRadian(fraction) {
  return fraction * 2 * Math.PI;
}