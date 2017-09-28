/*
Description : Combine two videos into a single canvas
Dependencies : []
Dependencies Description : Independent js module
Author : Pranin Shakya
*/
document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    var webcam = document.getElementById('webcamVideo');
    var screenshare = document.getElementById('screenshareVideo');
    var canvas = document.getElementById('video_canvas');
    var context = canvas.getContext('2d');

    var start_x = 0;
    var start_y = 0;

    webcam.addEventListener('play', function () {
        //draw(this,context,cw,ch,start_x,start_y);
        var cw = webcam.clientWidth;
        var ch = webcam.clientHeight;
        //draw(this,context,600,580,0,0);
        draw(this, context, cw, ch, start_x, start_y);

        // Continue next screen end point
        start_x = cw; // Change the starting x coordinate after placing one element
        start_y = ch; // Change the starting y coordinate after placing one element
    }, false);

	screenshare.addEventListener('play', function () {
		//draw(this,context,cw,ch,start_x,start_y);
        var cw = screenshare.clientWidth;
        var ch = screenshare.clientHeight;
        //draw(this,context,1000,580,600,580);
        draw(this, context, cw, ch, start_x, start_y);
	}, false);
}, false);

function draw(v, c, w, h, startx, starty) {
    'use strict';
    if (v.paused || v.ended) {
        return false;
    };
    c.drawImage(v, startx, 0, w, h);
    setTimeout(draw, 20, v, c, w, h, startx, starty);
}
