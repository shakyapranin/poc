// ......................................................
// .......................UI Code........................
// ......................................................

/*
Description : Broadcast video stream
Dependencies : ['rmc3.min.js']
Dependencies Description : RTCMultiConnection object from rm3.min.js
Author : Pranin Shakya
*/

var roomID = document.getElementById('room-id');
roomID.style.display = 'none';
// change id as per need
document.getElementById('share_webcam').onclick = function() {
    'use strict';
    disableInputButtons();

    // Set media constraints for the video, both set to false as broadcaster will not be receiving any data
    connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: false,
        OfferToReceiveVideo: false
    };

    // Open connection as per a unique and random url generated
    connection.open(document.getElementById('room-id').value, function() {
        showRoomURL(connection.sessionid);
    });
};

document.getElementById('join-room').onclick = function() {
    'use strict';
    disableInputButtons();

    // Set media constraints for the video, both set to true as receiving stream
    connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true
    };

    // Join room as per connection id
    connection.join(document.getElementById('room-id').value);
};

document.getElementById('open-or-join-room').onclick = function() {
    'use strict';
    disableInputButtons();

    // Create a connection if room-id doesn't exists else join if exists
    connection.openOrJoin(document.getElementById('room-id').value, function(isRoomExists, roomid) {
        if(!isRoomExists) {
            showRoomURL(roomid);
        }
    });
};

// ......................................................
// ..................RTCMultiConnection Code.............
// ......................................................

var connection = new RTCMultiConnection();

// by default, socket.io server is assumed to be deployed on your own URL
connection.socketURL = '/';

// comment-out below line if you do not have your own socket.io server
// connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

connection.socketMessageEvent = 'video-broadcast-demo';// Broadcasting event

connection.session = {
    audio: true,
    video: true,
    oneway: true
};

connection.videosContainer = document.getElementById('webcam'); // change video container id to webcam
connection.onstream = function(event) {
    'use strict';
    connection.videosContainer.appendChild(event.mediaElement);
    event.mediaElement.play();
    setTimeout(function() {
        event.mediaElement.play();
    }, 5000);
};

function disableInputButtons() {
    'use strict';
    document.getElementById('open-or-join-room').disabled = true;
    //document.getElementById('open-room').disabled = true;
    document.getElementById('share_webcam').disabled = true;
    document.getElementById('join-room').disabled = true;
    document.getElementById('room-id').disabled = true;
}

// ......................................................
// ......................Handling Room-ID................
// ......................................................


// This function is called once the broadcasting has started
function showRoomURL(roomid) {
    'use strict';
    var roomHashURL = '#' + roomid;
    var roomQueryStringURL = '?roomid=' + roomid;

    var html = '<h2>Unique URL for your room:</h2><br>';

    html += 'Hash URL: <a href="' + roomHashURL + '" target="_blank">' + roomHashURL + '</a>';
    html += '<br>';
    html += 'QueryString URL: <a href="' + roomQueryStringURL + '" target="_blank">' + roomQueryStringURL + '</a>';

    var roomURLsDiv = document.getElementById('room-urls');
    roomURLsDiv.innerHTML = html;

    roomURLsDiv.style.display = 'block';

    // Custom code for generating a share link url
    roomID.value = 'SHARE LINK : ' + window.location.href + '#' + roomid; // Generate a url
    roomID.style.display = 'inline-block'; // Show input tag after broadcasting has started
    roomID.style.border = 'none';
    roomID.style.textAlign = 'center';
    roomID.readOnly = true;
    roomID.size = roomID.value.length; // Set size as per value

}

(function() {
    'use strict';
    var params = {},
        r = /([^&=]+)=?([^&]*)/g;

    function d(s) {
        return decodeURIComponent(s.replace(/\+/g, ' '));
    }
    var match, search = window.location.search;
    while (match = r.exec(search.substring(1)))
        params[d(match[1])] = d(match[2]);
    window.params = params;

    // set parameters if ? or # ids are present in the url

})();

var roomid = '';
if (localStorage.getItem(connection.socketMessageEvent)) {
    roomid = localStorage.getItem(connection.socketMessageEvent);
} else {
    roomid = connection.token();
}
document.getElementById('room-id').value = roomid;
document.getElementById('room-id').onkeyup = function() {
    localStorage.setItem(connection.socketMessageEvent, this.value);
};

var hashString = location.hash.replace('#', '');

var roomid = params.roomid;
if(!roomid && hashString.length) {
    roomid = hashString;
}

if(roomid && roomid.length) {
    document.getElementById('room-id').value = roomid;
    localStorage.setItem(connection.socketMessageEvent, roomid);

    // auto-join-room
    (function reCheckRoomPresence() {

        // Check if room exists and join if it does
        connection.checkPresence(roomid, function(isRoomExists) {
            if(isRoomExists) {
                connection.join(roomid);
                return;
            }

            setTimeout(reCheckRoomPresence, 5000);
        });
    })();

    disableInputButtons();
}
