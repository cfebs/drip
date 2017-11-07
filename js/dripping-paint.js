/*
 * Dripping Paint
 *
 * By: Tim Holman
 * Wb: http://tholman.com
 *     @twholman
 */

var width = window.innerWidth;
var height = window.innerHeight;
var c = document.getElementById('c');
var ctx = c.getContext('2d');
c.width = width;
c.height = height;

var paint = [];

var totalPaints = width/50;
var size = 20;
if (width < 500) {
    size = 5;
}

function init(){
    for (var i = 0; i < totalPaints; i++){
        addPaint();
    }

	//Set Interval -- Terrible! I know!
    setInterval(function() {
        for (var i = 0; i < totalPaints; i++){
            addPaint();
        }
    }, 1000);
    window.requestAnimationFrame(update);
    //setInterval( update, 40 );
}

function drawPaint(x,y,size, colour) {
    ctx.beginPath();
    ctx.arc(x, y, size ,0 , Math.PI*2, true);
	ctx.closePath();
	ctx.fillStyle=colour;
	ctx.fill();
}

function update(){
    for (var i = 0; i < paint.length; i++){
        paint[i].y = paint[i].y + paint[i].v;
        if (paint[i].y > height + 60){
            paint.splice(i,1);
            //addPaint();
        }
        if (paint[i]) {
            drawPaint(paint[i].x, paint[i].y, paint[i].s, paint[i].c);
        }
    }
    window.requestAnimationFrame(update);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var colors = ['#8c0c0c', '#700a0a', '#681111'];

function addPaint(){
	//Try 50 times
	var i = 0;
	var maxTries = 25;
	var conflict;
	for (i; i < maxTries; i++) {
		size = Math.random() * size + 10;
		x = Math.random() * width;

		conflict = false;
		//Dont Allow drips ontop of each other (Overtaking drops destroy the prettyness)
        if (true) {
            for (var j = 0; j < paint.length; j++) {
                if ((x + size > paint[j].x) && (x - size < paint[j].x + paint[j].s)) {
                    conflict = true;
                    break;
                }

                if ((x - size < paint[j].x) && (x + size > paint[j].x - paint[j].s)) {
                    conflict = true;
                    break;
                }
            }
        }

		if (conflict == false) {
			paint.push({
				s: size,
				x: x,
				y: -60,
				v: ((Math.random() * 3) + 2) * 0.2,
                c: colors[getRandomInt(0, colors.length)]
				//c: '#' + (Math.random() * 0x313131 + 0xaaaaaa | 0).toString(16)
			});
			break;
		}
	}
}

init();
