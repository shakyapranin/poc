!function(){function e(e,o){var n={audio:!1,video:{mandatory:{chromeMediaSource:e?"screen":"desktop",maxWidth:window.screen.width>1920?window.screen.width:1920,maxHeight:window.screen.height>1080?window.screen.height:1080},optional:[]}};return o&&(n.video.mandatory.chromeMediaSourceId=o),n}function o(){return d?d.isLoaded?void d.contentWindow.postMessage({captureSourceId:!0},"*"):void setTimeout(o,100):void n(o)}function n(e){return d?void e():(d=document.createElement("iframe"),d.onload=function(){d.isLoaded=!0,e()},d.src="https://www.webrtc-experiment.com/getSourceId/",d.style.display="none",void(document.body||document.documentElement).appendChild(d))}window.getScreenId=function(n){function d(o){o.data&&(o.data.chromeMediaSourceId&&("PermissionDeniedError"===o.data.chromeMediaSourceId?n("permission-denied"):n(null,o.data.chromeMediaSourceId,e(null,o.data.chromeMediaSourceId))),o.data.chromeExtensionStatus&&n(o.data.chromeExtensionStatus,null,e(o.data.chromeExtensionStatus)),window.removeEventListener("message",d))}return navigator.mozGetUserMedia?void n(null,"firefox",{video:{mozMediaSource:"window",mediaSource:"window"}}):(o(),void window.addEventListener("message",d))};var d;window.getScreenConstraints=function(e){n(function(){getScreenId(function(o,n,d){e(o,d.video)})})}}(),function(){function e(e,o){var n={audio:!1,video:{mandatory:{chromeMediaSource:e?"screen":"desktop",maxWidth:window.screen.width>1920?window.screen.width:1920,maxHeight:window.screen.height>1080?window.screen.height:1080},optional:[]}};return o&&(n.video.mandatory.chromeMediaSourceId=o),n}function o(){return d?d.isLoaded?void d.contentWindow.postMessage({captureSourceId:!0},"*"):void setTimeout(o,100):void n(o)}function n(e){return d?void e():(d=document.createElement("iframe"),d.onload=function(){d.isLoaded=!0,e()},d.src="https://www.webrtc-experiment.com/getSourceId/",d.style.display="none",void(document.body||document.documentElement).appendChild(d))}if(-1!==document.domain.indexOf("webrtc-experiment.com")){window.getScreenId=function(n){function d(o){o.data&&(o.data.chromeMediaSourceId&&("PermissionDeniedError"===o.data.chromeMediaSourceId?n("permission-denied"):n(null,o.data.chromeMediaSourceId,e(null,o.data.chromeMediaSourceId))),o.data.chromeExtensionStatus&&n(o.data.chromeExtensionStatus,null,e(o.data.chromeExtensionStatus)),window.removeEventListener("message",d))}return navigator.mozGetUserMedia?void n(null,"firefox",{video:{mozMediaSource:"window",mediaSource:"window"}}):(o(),void window.addEventListener("message",d))};var d;window.getScreenConstraints=function(e){n(function(){getScreenId(function(o,n,d){e(o,d.video)})})}}}();