function disableInputButtons(){"use strict";document.getElementById("open-or-join-room").disabled=!0,document.getElementById("share_webcam").disabled=!0,document.getElementById("join-room").disabled=!0,document.getElementById("room-id").disabled=!0}function showRoomURL(o){"use strict";var e="#"+o,n="?roomid="+o,t="<h2>Unique URL for your room:</h2><br>";t+='Hash URL: <a href="'+e+'" target="_blank">'+e+"</a>",t+="<br>",t+='QueryString URL: <a href="'+n+'" target="_blank">'+n+"</a>";var i=document.getElementById("room-urls");i.innerHTML=t,i.style.display="block",roomID.value="SHARE LINK : "+window.location.href+"#"+o,roomID.style.display="inline-block",roomID.style.border="none",roomID.style.textAlign="center",roomID.readOnly=!0,roomID.size=roomID.value.length}var roomID=document.getElementById("room-id");roomID.style.display="none",document.getElementById("share_webcam").onclick=function(){"use strict";disableInputButtons(),connection.sdpConstraints.mandatory={OfferToReceiveAudio:!1,OfferToReceiveVideo:!1},connection.open(document.getElementById("room-id").value,function(){showRoomURL(connection.sessionid)})},document.getElementById("join-room").onclick=function(){"use strict";disableInputButtons(),connection.sdpConstraints.mandatory={OfferToReceiveAudio:!0,OfferToReceiveVideo:!0},connection.join(document.getElementById("room-id").value)},document.getElementById("open-or-join-room").onclick=function(){"use strict";disableInputButtons(),connection.openOrJoin(document.getElementById("room-id").value,function(o,e){o||showRoomURL(e)})};var connection=new RTCMultiConnection;connection.socketURL="/",connection.socketMessageEvent="video-broadcast-demo",connection.session={audio:!0,video:!0,oneway:!0},connection.videosContainer=document.getElementById("webcam"),connection.onstream=function(o){"use strict";connection.videosContainer.appendChild(o.mediaElement),o.mediaElement.play(),setTimeout(function(){o.mediaElement.play()},5e3)},function(){"use strict";function o(o){return decodeURIComponent(o.replace(/\+/g," "))}for(var e,n={},t=/([^&=]+)=?([^&]*)/g,i=window.location.search;e=t.exec(i.substring(1));)n[o(e[1])]=o(e[2]);window.params=n}();var roomid="";roomid=localStorage.getItem(connection.socketMessageEvent)?localStorage.getItem(connection.socketMessageEvent):connection.token(),document.getElementById("room-id").value=roomid,document.getElementById("room-id").onkeyup=function(){localStorage.setItem(connection.socketMessageEvent,this.value)};var hashString=location.hash.replace("#",""),roomid=params.roomid;!roomid&&hashString.length&&(roomid=hashString),roomid&&roomid.length&&(document.getElementById("room-id").value=roomid,localStorage.setItem(connection.socketMessageEvent,roomid),function o(){connection.checkPresence(roomid,function(e){return e?void connection.join(roomid):void setTimeout(o,5e3)})}(),disableInputButtons());