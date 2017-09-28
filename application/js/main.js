/*
Description : Main activity
Dependencies : ['getScreenId.js']
Dependencies Description : Use of getScreenId
Author : Pranin Shakya
*/
(function () {
    // http://www.html5rocks.com/en/tutorials/getusermedia/intro/
    'use strict';

    window.onload = function () {

        var share_webcam_button = document.getElementById('share_webcam');
        var share_screen_button = document.getElementById('share_screen');

        // Hide screenshare video tag on page load
        var screenSharingTag = document.getElementById('screenshareVideo');
        screenSharingTag.style.display = 'none';

        var overlay_div = document.getElementById('overlay');
        overlay_div.style.display = "none"; // hide loader after page load

        share_webcam_button.addEventListener('click', start_webcamstreaming);
        share_screen_button.addEventListener('click', start_screenstreaming);

        /* Function to check getUserMedia support as per browsers */
        function hasGetUserMedia () {
            return navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        }

        /* Function to initialize navigator.getUserMedia object after button click */
        function start_webcamstreaming () {
            /*ignore jslint start*/
            if (hasGetUserMedia()) {
                var errorCallback = function (e) {
                    console.log('Browser error!', e);
                };
                navigator.getUserMedia = hasGetUserMedia();
                var video = document.querySelector('video.webcam');
                var hdConstraints = {
                    audio: false,
                    video: {
                        mandatory: {
                            minWidth: 640,
                            maxWidth: 1980,
                            minHeight: 480,
                            maxHeight: 1080
                        }
                    }
                };
                if (navigator.getUserMedia) {
                    navigator.getUserMedia(hdConstraints, function (stream) {
                        //video.src = window.URL.createObjectURL(stream);
                        //video.muted;
                        //video.play(); // Auto play video on source select.
                        console.log("Camera invokation commented out as RTC approach calls access from within.");
                    }, errorCallback);
                } else {
                    // fallback.
                    console.error("Navigator getUserMedia error");
                }

            } else {
                alert('getUserMedia() is not supported in your browser');
            }
            this.style.display = "none";
            /*ignore jslint end*/
        }

        /* Function to initialize navigator.getUserMedia object after button click and screen sharing */
        function start_screenstreaming () {

            screenSharingTag.style.display = 'inline-block';

            this.disabled = true;
            // call get screen id function
            getScreenId(function (error, sourceId, screen_constraints) {
                // error    == null || 'permission-denied' || 'not-installed' || 'installed-disabled' || 'not-chrome'
                // sourceId == null || 'string' || 'firefox'
                // getUserMedia(screen_constraints, onSuccess, onFailure);
                //
                navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
                navigator.getUserMedia(screen_constraints, function (stream) {
                    document.querySelector('video.screenshare').src = URL.createObjectURL(stream);
                    document.querySelector('video.screenshare').play(); // Auto play video on source select
                    stream.onended = function () {
                        document.querySelector('video.screenshare').src = null;
                        document.getElementById('capture-screen').disabled = false;
                    };
                }, function (error) {
                    // alert(JSON.stringify(error, null, '\t'));
                    console.log("Error in screen sharing", error);
                    console.log("Possible Security Error, Please verify HTTPS protocol is being followed"); // Exceptions usually caused due to use of HTTP
                });
            }); // End getScreenId Call

        }
    }; // End of window.onload call

})();
