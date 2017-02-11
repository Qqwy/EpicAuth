/*Easter Egg Confetti*/
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var canvas;
$(document).ready(function(){    canvas = $('#confetti').get(0);});
var ctx;
var confettiHandler;
//canvas dimensions
var W;
var H;
var mp = 50; //max particles
var particles = [];
var maxconfettitime = 8000;
var endConfetti = false;
var dt=0;

$(window).resize(function () {
    //canvas = $('#confetti').get(0);});
    //canvas dimensions
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
});


  initConfetti = function () {

    for (var i = 0; i < mp; i++) {
        var randcol = ~~(Math.random()*colors.length);
        particles.push({
            x: Math.random() * W, //x-coordinate
            y: Math.random() * -H, //y-coordinate
            r: randomFromTo(10, 50), //radius
            d: (Math.random() * mp) + 10, //density
            color: colors[randcol],//"rgba(" + Math.floor((Math.random() * 255)) + ", " + Math.floor((Math.random() * 255)) + ", " + Math.floor((Math.random() * 255)) + ", 0.7)",
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngleIncremental: (Math.random() * 0.07) + .05,
            tiltAngle: 0,
            num:i /*Keep num the same after removing particles from array */
        });
    }


}



draw = function (timestamp) {
    ctx.clearRect(0, 0, W, H);

    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;  // Green path
        ctx.globalAlpha = 1;
        ctx.moveTo(p.x + p.tilt + (p.r / 4), p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + (p.r / 4));
        ctx.stroke();  // Draw it
    }

    update(timestamp);
}
function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}
var TiltChangeCountdown = 5;
//Function to move the snowflakes
//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
var angle = 0;
var tiltAngle = 0;
var oldtimestamp = 0;
var start = null;
function update(timestamp) {
    var dt = timestamp - oldtimestamp;
  oldtimestamp = timestamp;
  if (start === null) start = timestamp;

  if((timestamp-start)>maxconfettitime){
    endConfetti=true;
  }

    angle += 0.02*dt;
    tiltAngle += 0.1*dt;
    TiltChangeCountdown=-1*dt;
    for (var i = 0; i < particles.length; i++) {

        var p = particles[i];
        p.tiltAngle += p.tiltAngleIncremental;
        //Updating X and Y coordinates
        //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
        //Every particle has its own density which can be used to make the downward movement different for each flake
        //Lets make it more random by adding in the radius
        p.y += (2*Math.cos(angle + p.d) + 1 + p.r / 2) / 2;
        p.x += 3*Math.sin(.1*angle+p.d);
        //p.tilt = (Math.cos(p.tiltAngle - (i / 3))) * 15;
        p.tilt = (Math.sin(p.tiltAngle - (p.num / 3))) * 15;

        //Sending flakes back from the top when it exits
        //Lets make it a bit more organic and let flakes enter from the left and right also.
        if ((p.x > W + 5 || p.x < -5 || p.y > H )) {
          if(endConfetti){
            particles.splice(i,1);//remove particle;
          }else{
            if (i % 5 > 0 || i % 2 == 0) //66.67% of the flakes
            {
                particles[i] = {num:i, x: Math.random() * W, y: -10, r: p.r, d: p.d, color: p.color, tilt: Math.floor(Math.random() * 10) - 10, tiltAngle: p.tiltAngle, tiltAngleIncremental: p.tiltAngleIncremental };
            }
            else {
                //If the flake is exitting from the right
                if (Math.sin(angle) > 0) {
                    //Enter from the left
                    particles[i] = {num:i, x: -5, y: Math.random() * H, r: p.r, d: p.d, color: p.color, tilt: Math.floor(Math.random() * 10) - 10, tiltAngleIncremental: p.tiltAngleIncremental };
                }
                else {
                    //Enter from the right
                    particles[i] = {num:i, x: W + 5, y: Math.random() * H, r: p.r, d: p.d, color: p.color, tilt: Math.floor(Math.random() * 10) - 10, tiltAngleIncremental: p.tiltAngleIncremental };
                }
            }
          }
        }
    }
    if(particles.length <1){
      StopConfetti();
    }else{
      requestAnimationFrame(draw);
    }

}
function StartConfetti() {

    $(canvas).addClass('active');
    ctx = canvas.getContext("2d");
    //canvas dimensions
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    colors = new Array('red', 'lightgreen', 'blue','cyan', 'orange', 'gold', 'lime', 'purple');


    //confettiHandler = setInterval(draw, 15);
    initConfetti();
    requestAnimationFrame(draw);
}
function StopConfetti() {
    $(canvas).removeClass('active');

    //clearTimeout(confettiHandler);
    if (ctx == undefined) return;
    ctx.clearRect(0, 0, W, H);

    start=null;//set up for next loop
    endConfetti=false;
}
//animation loop
/*End Easter Egg Confetti*/
