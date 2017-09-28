/*
Description : Recording canvas activity
Dependencies : ['recordrtc.js','ffmpeg_asm.js']
Dependencies Description : RecordRTC from recordrtc.js and ffmpeg conversion function for ffmpeg_asm.js
Author : Pranin Shakya
*/

// SECOND CUSTOM SCRIPTS START
var elementToShare = document.getElementById('elementToShare'); // DIV TAG HOLDING TWO VIDEOS

var canvasRecorder = new RecordRTC(elementToShare,{
	type : 'canvas',
  recorderType: CanvasRecorder
}); // INTIALIZING canvasRecorder TO RECORD THE DIV TAG AS ONE CANVAS

var recordAudio;

var startButton = document.getElementById('start');
var stopButton = document.getElementById('stop');
var pauseButton = document.getElementById('pause');
var resumeButton = document.getElementById('resume');

var overlayDiv = document.getElementById('overlay');
var messageDiv = document.getElementById('message');
var compilemessageDiv = document.getElementById('compilemessage');

// BINDING ON CLICK EVENT FROM VIDEO RECORDING CONTROLS

startButton.addEventListener('click',startRecordingEvent);
stopButton.addEventListener('click',stopRecordingEvent);
pauseButton.addEventListener('click',pauseRecordingEvent);
resumeButton.addEventListener('click',resumeRecordingEvent);


// FUNCTION TO START RECORDING
/*
* Function to start recording
*
*/
function startRecordingEvent(){
    'use strict';
	this.disabled = true;
	navigator.getUserMedia({ audio: true }, function(stream) {
			recordAudio = new RecordRTC(stream, {
					type: 'audio',
					recorderType: StereoAudioRecorder // force WebAudio for all browsers even for Firefox/MS-Edge
			});

			recordAudio.initRecorder(function() {
					canvasRecorder.startRecording();
					recordAudio.startRecording();
			});
			stopButton.disabled = false;
	}, function(error) { log( JSON.stringify ( error ) ); });

	// Show pause and save button
  startButton.style.display = "none";
  pauseButton.style.display = "inline-block";
  stopButton.style.display = "inline-block";

}


// FUNCTION TO STOP RECORDING
function stopRecordingEvent(){
    'use strict';
    compilemessageDiv.style.display = "inline-block";
	overlayDiv.style.display = "block";// Overlay when processing file
	this.disabled = true;

    // Stop the audio recording and canvas recording to combine the video
	recordAudio.stopRecording(function() {
			canvasRecorder.stopRecording(function() {
					convertStreams(canvasRecorder.blob, recordAudio.blob);
					log('<a href="'+ workerPath +'" download="ffmpeg-asm.js">ffmpeg-asm.js</a> file download started. It is about 18MB in size; please be patient!');
			});
	});
	startButton.disabled = false;

	// Hide pause,resume and stop button
	pauseButton.style.display = "none";
	resumeButton.style.display = "none";
	stopButton.style.display = "none";

}

// FUNCTION TO PAUSE RECORDING
function pauseRecordingEvent(){
    'use strict';
	canvasRecorder.pauseRecording();
	pauseButton.style.display = "none";
	resumeButton.style.display = "inline-block";

}

// FUNCTION TO RESUME RECORDING
function resumeRecordingEvent(){
    'use strict';
	canvasRecorder.resumeRecording();
	resumeButton.style.display = "none";
	pauseButton.style.display = "inline-block";
}

// LOGIC FOR FFMPEG_ASM TO RECORD CANVAS + AUDIO

// WORKER PATH FOR ffmpeg library
var workerPath = window.location.href + 'js/lib/ffmpeg_asm.js';

function processInWebWorker() {
    'use strict';
    var blob = URL.createObjectURL(new Blob(['importScripts("' + workerPath + '");var now = Date.now;function print(text) {postMessage({"type" : "stdout","data" : text});};onmessage = function(event) {var message = event.data;if (message.type === "command") {var Module = {print: print,printErr: print,files: message.files || [],arguments: message.arguments || [],TOTAL_MEMORY: 268435456};postMessage({"type" : "start","data" : Module.arguments.join(" ")});postMessage({"type" : "stdout","data" : "Received command: " +Module.arguments.join(" ") +((Module.TOTAL_MEMORY) ? ".  Processing with " + Module.TOTAL_MEMORY + " bits." : "")});var time = now();var result = ffmpeg_run(Module);var totalTime = now() - time;postMessage({"type" : "stdout","data" : "Finished processing (took " + totalTime + "ms)"});postMessage({"type" : "done","data" : result,"time" : totalTime});}};postMessage({"type" : "ready"});'], {
        type: 'application/javascript'
    }));

    var worker = new Worker(blob);
    URL.revokeObjectURL(blob);
    return worker;
}

var worker;

function convertStreams(videoBlob, audioBlob) {
    'use strict';
    var vab;
    var aab;
    var buffersReady;
    var workerReady;
    var posted = false;

    var fileReader1 = new FileReader();
    fileReader1.onload = function() {
        vab = this.result;

        if (aab) buffersReady = true;

        if (buffersReady && workerReady && !posted) postMessage();
    };
    var fileReader2 = new FileReader();
    fileReader2.onload = function() {
        aab = this.result;

        if (vab) buffersReady = true;

        if (buffersReady && workerReady && !posted) postMessage();
    };

    fileReader1.readAsArrayBuffer(videoBlob);
    fileReader2.readAsArrayBuffer(audioBlob);

    if (!worker) {
        worker = processInWebWorker();
    }

    worker.onmessage = function(event) {
        var message = event.data;
        if (message.type == "ready") {
            log('<a href="'+ workerPath +'" download="ffmpeg-asm.js">ffmpeg-asm.js</a> file has been loaded.');
            workerReady = true;
            if (buffersReady)
                postMessage();
        } else if (message.type == "stdout") {
            log(message.data);
        } else if (message.type == "start") {
            log('<a href="'+ workerPath +'" download="ffmpeg-asm.js">ffmpeg-asm.js</a> file received ffmpeg command.');
        } else if (message.type == "done") {
            log(JSON.stringify(message));

            var result = message.data[0];
            log(JSON.stringify(result));

            var blob = new Blob([result.data], {
                type: 'video/mp4'
            });

            log(JSON.stringify(blob));

            PostBlob(blob);
        }
    };
    var postMessage = function() {
        posted = true;
        // FFMPEG OPTIONS
        worker.postMessage({
            type: 'command',
            arguments: [
                '-i', 'video.webm',
                '-i', 'audio.wav',
                '-c:v', 'mpeg4', // video codec
                '-c:a', 'vorbis',// audio codec
                '-b:v', '2200k',// video bit rate
                '-b:a', '4800k',// audio bit rate
                '-strict', 'experimental', 'output.mp4'
            ],
            files: [
                {
                    data: new Uint8Array(vab),
                    name: 'video.webm'
                },
                {
                    data: new Uint8Array(aab),
                    name: "audio.wav"
                }
            ]
        });
    };
}

var h2 = document.querySelector('h2');

function PostBlob(blob) {
    h2.innerHTML = '<a href="' + URL.createObjectURL(blob) + '" target="_blank" download="Recording_' + Date.now() +'.mp4">Download recorded mp4 file</a>';
    h2.setAttribute('contenteditable', 'false');

		// Show the start button and hide others
		startButton.style.display = "inline-block";
		messageDiv.style.display = "inline-block";
		overlayDiv.style.display = "none";


}

function log(message) {
    h2.innerHTML = message;
    console.log(message);
}
// SECOND CUSTOM SCRIPT END
