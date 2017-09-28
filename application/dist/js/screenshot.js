"use strict";function h2clog(t){_html2canvas.logging&&window.console&&window.console.log&&window.console.log(t)}function backgroundBoundsFactory(t,e,n,a,o,r){var i,l,c,d,s=_html2canvas.Util.getCSS(e,t,o);if(1===s.length&&(d=s[0],s=[],s[0]=d,s[1]=d),-1!==s[0].toString().indexOf("%"))c=parseFloat(s[0])/100,l=n.width*c,"backgroundSize"!==t&&(l-=(r||a).width*c);else if("backgroundSize"===t)if("auto"===s[0])l=a.width;else if(s[0].match(/contain|cover/)){var h=_html2canvas.Util.resizeBounds(a.width,a.height,n.width,n.height,s[0]);l=h.width,i=h.height}else l=parseInt(s[0],10);else l=parseInt(s[0],10);return"auto"===s[1]?i=l/a.width*a.height:-1!==s[1].toString().indexOf("%")?(c=parseFloat(s[1])/100,i=n.height*c,"backgroundSize"!==t&&(i-=(r||a).height*c)):i=parseInt(s[1],10),[l,i]}function h2czContext(t){return{zindex:t,children:[]}}function h2cRenderContext(t,e){var n=[];return{storage:n,width:t,height:e,clip:function(){n.push({type:"function",name:"clip",arguments:arguments})},translate:function(){n.push({type:"function",name:"translate",arguments:arguments})},fill:function(){n.push({type:"function",name:"fill",arguments:arguments})},save:function(){n.push({type:"function",name:"save",arguments:arguments})},restore:function(){n.push({type:"function",name:"restore",arguments:arguments})},fillRect:function(){n.push({type:"function",name:"fillRect",arguments:arguments})},createPattern:function(){n.push({type:"function",name:"createPattern",arguments:arguments})},drawShape:function(){var t=[];return n.push({type:"function",name:"drawShape",arguments:t}),{moveTo:function(){t.push({name:"moveTo",arguments:arguments})},lineTo:function(){t.push({name:"lineTo",arguments:arguments})},arcTo:function(){t.push({name:"arcTo",arguments:arguments})},bezierCurveTo:function(){t.push({name:"bezierCurveTo",arguments:arguments})},quadraticCurveTo:function(){t.push({name:"quadraticCurveTo",arguments:arguments})}}},drawImage:function(){n.push({type:"function",name:"drawImage",arguments:arguments})},fillText:function(){n.push({type:"function",name:"fillText",arguments:arguments})},setVariable:function(t,e){n.push({type:"variable",name:t,arguments:e})}}}function getMouseXY(t){return IE?(coordX=event.clientX+document.body.scrollLeft,coordY=event.clientY+document.body.scrollTop):(coordX=t.pageX,coordY=t.pageY),0>coordX&&(coordX=0),0>coordY&&(coordY=0),!0}var _html2canvas={},previousElement,computedCSS,html2canvas;_html2canvas.Util={},_html2canvas.Util.trimText=function(t){return function(e){return t?t.apply(e):((e||"")+"").replace(/^\s+|\s+$/g,"")}}(String.prototype.trim),_html2canvas.Util.parseBackgroundImage=function(t){var e,n,a,o,r,i,l,c,d=" \r\n	",s=[],h=0,u=0,m=function(){e&&('"'===n.substr(0,1)&&(n=n.substr(1,n.length-2)),n&&c.push(n),"-"===e.substr(0,1)&&(o=e.indexOf("-",1)+1)>0&&(a=e.substr(0,o),e=e.substr(o)),s.push({prefix:a,method:e.toLowerCase(),value:r,args:c})),c=[],e=a=n=r=""};m();for(var g=0,p=t.length;p>g;g++)if(i=t[g],!(0===h&&d.indexOf(i)>-1)){switch(i){case'"':l?l===i&&(l=null):l=i;break;case"(":if(l)break;if(0===h){h=1,r+=i;continue}u++;break;case")":if(l)break;if(1===h){if(0===u){h=0,r+=i,m();continue}u--}break;case",":if(l)break;if(0===h){m();continue}if(1===h&&0===u&&!e.match(/^url$/i)){c.push(n),n="",r+=i;continue}}r+=i,0===h?e+=i:n+=i}return m(),s},_html2canvas.Util.Bounds=function(t){var e,n={};return t.getBoundingClientRect?(e=t.getBoundingClientRect(),n.top=e.top,n.bottom=e.bottom||e.top+e.height,n.left=e.left,n.width=e.width||e.right-e.left,n.height=e.height||e.bottom-e.top,n):void 0},_html2canvas.Util.getCSS=function(t,e,n){function a(e,n){var a,o=t.runtimeStyle&&t.runtimeStyle[e],r=t.style;return!/^-?[0-9]+\.?[0-9]*(?:px)?$/i.test(n)&&/^-?\d/.test(n)&&(a=r.left,o&&(t.runtimeStyle.left=t.currentStyle.left),r.left="fontSize"===e?"1em":n||0,n=r.pixelLeft+"px",r.left=a,o&&(t.runtimeStyle.left=o)),/^(thin|medium|thick)$/i.test(n)?n:Math.round(parseFloat(n))+"px"}var o,r=e.match(/^background(Size|Position)$/);if(previousElement!==t&&(computedCSS=document.defaultView.getComputedStyle(t,null)),o=computedCSS[e],r)if(o=(o||"").split(","),o=o[n||0]||o[0]||"auto",o=_html2canvas.Util.trimText(o).split(" "),"backgroundSize"!==e||o[0]&&!o[0].match(/cover|contain|auto/)){if(o[0]=-1===o[0].indexOf("%")?a(e+"X",o[0]):o[0],void 0===o[1]){if("backgroundSize"===e)return o[1]="auto",o;o[1]=o[0]}o[1]=-1===o[1].indexOf("%")?a(e+"Y",o[1]):o[1]}else;else if(/border(Top|Bottom)(Left|Right)Radius/.test(e)){var i=o.split(" ");i.length<=1&&(i[1]=i[0]),i[0]=parseInt(i[0],10),i[1]=parseInt(i[1],10),o=i}return o},_html2canvas.Util.resizeBounds=function(t,e,n,a,o){var r,i,l=n/a,c=t/e;return o&&"auto"!==o?c>l^"contain"===o?(i=a,r=a*c):(r=n,i=n/c):(r=n,i=a),{width:r,height:i}},_html2canvas.Util.BackgroundPosition=function(t,e,n,a,o){var r=backgroundBoundsFactory("backgroundPosition",t,e,n,a,o);return{left:r[0],top:r[1]}},_html2canvas.Util.BackgroundSize=function(t,e,n,a){var o=backgroundBoundsFactory("backgroundSize",t,e,n,a);return{width:o[0],height:o[1]}},_html2canvas.Util.Extend=function(t,e){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},_html2canvas.Util.Children=function(t){var e;try{e=t.nodeName&&"IFRAME"===t.nodeName.toUpperCase()?t.contentDocument||t.contentWindow.document:function(t){var e=[];return null!==t&&!function(t,e){var n=t.length,a=0;if("number"==typeof e.length)for(var o=e.length;o>a;a++)t[n++]=e[a];else for(;void 0!==e[a];)t[n++]=e[a++];return t.length=n,t}(e,t),e}(t.childNodes)}catch(n){h2clog("html2canvas.Util.Children failed with exception: "+n.message),e=[]}return e},_html2canvas.Util.Font=function(){var t={};return function(e,n,a){if(void 0!==t[e+"-"+n])return t[e+"-"+n];var o,r,i,l=a.createElement("div"),c=a.createElement("img"),d=a.createElement("span"),s="Hidden Text";return l.style.visibility="hidden",l.style.fontFamily=e,l.style.fontSize=n,l.style.margin=0,l.style.padding=0,a.body.appendChild(l),c.src="data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=",c.width=1,c.height=1,c.style.margin=0,c.style.padding=0,c.style.verticalAlign="baseline",d.style.fontFamily=e,d.style.fontSize=n,d.style.margin=0,d.style.padding=0,d.appendChild(a.createTextNode(s)),l.appendChild(d),l.appendChild(c),o=c.offsetTop-d.offsetTop+1,l.removeChild(d),l.appendChild(a.createTextNode(s)),l.style.lineHeight="normal",c.style.verticalAlign="super",r=c.offsetTop-l.offsetTop+1,i={baseline:o,lineWidth:1,middle:r},t[e+"-"+n]=i,a.body.removeChild(l),i}}(),function(){_html2canvas.Generate={};var t=[/^(-webkit-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/,/^(-o-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/,/^(-webkit-gradient)\((linear|radial),\s((?:\d{1,3}%?)\s(?:\d{1,3}%?),\s(?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)\-]+)\)$/,/^(-moz-linear-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)]+)\)$/,/^(-webkit-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/,/^(-moz-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s?([a-z\-]*)([\w\d\.\s,%\(\)]+)\)$/,/^(-o-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/];_html2canvas.Generate.parseGradient=function(e,n){var a,o,r,i,l,c,d,s,h,u,m,g,p=t.length;for(o=0;p>o&&!(r=e.match(t[o]));o+=1);if(r)switch(r[1]){case"-webkit-linear-gradient":case"-o-linear-gradient":if(a={type:"linear",x0:null,y0:null,x1:null,y1:null,colorStops:[]},l=r[2].match(/\w+/g))for(c=l.length,o=0;c>o;o+=1)switch(l[o]){case"top":a.y0=0,a.y1=n.height;break;case"right":a.x0=n.width,a.x1=0;break;case"bottom":a.y0=n.height,a.y1=0;break;case"left":a.x0=0,a.x1=n.width}if(null===a.x0&&null===a.x1&&(a.x0=a.x1=n.width/2),null===a.y0&&null===a.y1&&(a.y0=a.y1=n.height/2),l=r[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g))for(c=l.length,d=1/Math.max(c-1,1),o=0;c>o;o+=1)s=l[o].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/),s[2]?(i=parseFloat(s[2]),i/="%"===s[3]?100:n.width):i=o*d,a.colorStops.push({color:s[1],stop:i});break;case"-webkit-gradient":if(a={type:"radial"===r[2]?"circle":r[2],x0:0,y0:0,x1:0,y1:0,colorStops:[]},l=r[3].match(/(\d{1,3})%?\s(\d{1,3})%?,\s(\d{1,3})%?\s(\d{1,3})%?/),l&&(a.x0=l[1]*n.width/100,a.y0=l[2]*n.height/100,a.x1=l[3]*n.width/100,a.y1=l[4]*n.height/100),l=r[4].match(/((?:from|to|color-stop)\((?:[0-9\.]+,\s)?(?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)\))+/g))for(c=l.length,o=0;c>o;o+=1)s=l[o].match(/(from|to|color-stop)\(([0-9\.]+)?(?:,\s)?((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\)/),i=parseFloat(s[2]),"from"===s[1]&&(i=0),"to"===s[1]&&(i=1),a.colorStops.push({color:s[3],stop:i});break;case"-moz-linear-gradient":if(a={type:"linear",x0:0,y0:0,x1:0,y1:0,colorStops:[]},l=r[2].match(/(\d{1,3})%?\s(\d{1,3})%?/),l&&(a.x0=l[1]*n.width/100,a.y0=l[2]*n.height/100,a.x1=n.width-a.x0,a.y1=n.height-a.y0),l=r[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}%)?)+/g))for(c=l.length,d=1/Math.max(c-1,1),o=0;c>o;o+=1)s=l[o].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%)?/),s[2]?(i=parseFloat(s[2]),s[3]&&(i/=100)):i=o*d,a.colorStops.push({color:s[1],stop:i});break;case"-webkit-radial-gradient":case"-moz-radial-gradient":case"-o-radial-gradient":if(a={type:"circle",x0:0,y0:0,x1:n.width,y1:n.height,cx:0,cy:0,rx:0,ry:0,colorStops:[]},l=r[2].match(/(\d{1,3})%?\s(\d{1,3})%?/),l&&(a.cx=l[1]*n.width/100,a.cy=l[2]*n.height/100),l=r[3].match(/\w+/),s=r[4].match(/[a-z\-]*/),l&&s)switch(s[0]){case"farthest-corner":case"cover":case"":h=Math.sqrt(Math.pow(a.cx,2)+Math.pow(a.cy,2)),u=Math.sqrt(Math.pow(a.cx,2)+Math.pow(a.y1-a.cy,2)),m=Math.sqrt(Math.pow(a.x1-a.cx,2)+Math.pow(a.y1-a.cy,2)),g=Math.sqrt(Math.pow(a.x1-a.cx,2)+Math.pow(a.cy,2)),a.rx=a.ry=Math.max(h,u,m,g);break;case"closest-corner":h=Math.sqrt(Math.pow(a.cx,2)+Math.pow(a.cy,2)),u=Math.sqrt(Math.pow(a.cx,2)+Math.pow(a.y1-a.cy,2)),m=Math.sqrt(Math.pow(a.x1-a.cx,2)+Math.pow(a.y1-a.cy,2)),g=Math.sqrt(Math.pow(a.x1-a.cx,2)+Math.pow(a.cy,2)),a.rx=a.ry=Math.min(h,u,m,g);break;case"farthest-side":"circle"===l[0]?a.rx=a.ry=Math.max(a.cx,a.cy,a.x1-a.cx,a.y1-a.cy):(a.type=l[0],a.rx=Math.max(a.cx,a.x1-a.cx),a.ry=Math.max(a.cy,a.y1-a.cy));break;case"closest-side":case"contain":"circle"===l[0]?a.rx=a.ry=Math.min(a.cx,a.cy,a.x1-a.cx,a.y1-a.cy):(a.type=l[0],a.rx=Math.min(a.cx,a.x1-a.cx),a.ry=Math.min(a.cy,a.y1-a.cy))}if(l=r[5].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g))for(c=l.length,d=1/Math.max(c-1,1),o=0;c>o;o+=1)s=l[o].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/),s[2]?(i=parseFloat(s[2]),i/="%"===s[3]?100:n.width):i=o*d,a.colorStops.push({color:s[1],stop:i})}return a},_html2canvas.Generate.Gradient=function(t,e){if(0!==e.width&&0!==e.height){var n,a,o,r,i=document.createElement("canvas"),l=i.getContext("2d");if(i.width=e.width,i.height=e.height,n=_html2canvas.Generate.parseGradient(t,e))if("linear"===n.type){for(a=l.createLinearGradient(n.x0,n.y0,n.x1,n.y1),o=0,r=n.colorStops.length;r>o;o+=1)try{a.addColorStop(n.colorStops[o].stop,n.colorStops[o].color)}catch(c){h2clog(["failed to add color stop: ",c,"; tried to add: ",n.colorStops[o],"; stop: ",o,"; in: ",t])}l.fillStyle=a,l.fillRect(0,0,e.width,e.height)}else if("circle"===n.type){for(a=l.createRadialGradient(n.cx,n.cy,0,n.cx,n.cy,n.rx),o=0,r=n.colorStops.length;r>o;o+=1)try{a.addColorStop(n.colorStops[o].stop,n.colorStops[o].color)}catch(c){h2clog(["failed to add color stop: ",c,"; tried to add: ",n.colorStops[o],"; stop: ",o,"; in: ",t])}l.fillStyle=a,l.fillRect(0,0,e.width,e.height)}else if("ellipse"===n.type){var d=document.createElement("canvas"),s=d.getContext("2d"),h=Math.max(n.rx,n.ry),u=2*h;for(d.width=d.height=u,a=s.createRadialGradient(n.rx,n.ry,0,n.rx,n.ry,h),o=0,r=n.colorStops.length;r>o;o+=1)try{a.addColorStop(n.colorStops[o].stop,n.colorStops[o].color)}catch(c){h2clog(["failed to add color stop: ",c,"; tried to add: ",n.colorStops[o],"; stop: ",o,"; in: ",t])}s.fillStyle=a,s.fillRect(0,0,u,u),l.fillStyle=n.colorStops[o-1].color,l.fillRect(0,0,i.width,i.height),l.drawImage(d,n.cx-n.rx,n.cy-n.ry,2*n.rx,2*n.ry)}return i}},_html2canvas.Generate.ListAlpha=function(t){var e,n="";do e=t%26,n=String.fromCharCode(e+64)+n,t/=26;while(26*t>26);return n},_html2canvas.Generate.ListRoman=function(t){var e,n=["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"],a=[1e3,900,500,400,100,90,50,40,10,9,5,4,1],o="",r=n.length;if(0>=t||t>=4e3)return t;for(e=0;r>e;e+=1)for(;t>=a[e];)t-=a[e],o+=n[e];return o}}(),_html2canvas.Parse=function(t,e){function n(){return Math.max(Math.max(tt.body.scrollWidth,tt.documentElement.scrollWidth),Math.max(tt.body.offsetWidth,tt.documentElement.offsetWidth),Math.max(tt.body.clientWidth,tt.documentElement.clientWidth))}function a(){return Math.max(Math.max(tt.body.scrollHeight,tt.documentElement.scrollHeight),Math.max(tt.body.offsetHeight,tt.documentElement.offsetHeight),Math.max(tt.body.clientHeight,tt.documentElement.clientHeight))}function o(t,e){var n=parseInt(ot(t,e),10);return isNaN(n)?0:n}function r(t,e,n,a,o,r){"transparent"!==r&&(t.setVariable("fillStyle",r),t.fillRect(e,n,a,o),Z+=1)}function i(t,e){switch(e){case"lowercase":return t.toLowerCase();case"capitalize":return t.replace(/(^|\s|:|-|\(|\))([a-z])/g,function(t,e,n){return t.length>0?e+n.toUpperCase():void 0});case"uppercase":return t.toUpperCase();default:return t}}function l(t){return/^(normal|none|0px)$/.test(t)}function c(t,e,n,a){null!==t&&_html2canvas.Util.trimText(t).length>0&&(a.fillText(t,e,n),Z+=1)}function d(t,e,n,a){var o=!1,r=ot(e,"fontWeight"),i=ot(e,"fontFamily"),l=ot(e,"fontSize");switch(parseInt(r,10)){case 401:r="bold";break;case 400:r="normal"}return t.setVariable("fillStyle",a),t.setVariable("font",[ot(e,"fontStyle"),ot(e,"fontVariant"),r,l,i].join(" ")),t.setVariable("textAlign",o?"right":"left"),"none"!==n?_html2canvas.Util.Font(i,l,tt):void 0}function s(t,e,n,a,o){switch(e){case"underline":r(t,n.left,Math.round(n.top+a.baseline+a.lineWidth),n.width,1,o);break;case"overline":r(t,n.left,Math.round(n.top),n.width,1,o);break;case"line-through":r(t,n.left,Math.ceil(n.top+a.middle+a.lineWidth),n.width,1,o)}}function h(t,e,n,a){var o;if(et.rangeBounds)"none"===n&&0===_html2canvas.Util.trimText(e).length||(o=u(e,t.node,t.textOffset)),t.textOffset+=e.length;else if(t.node&&"string"==typeof t.node.nodeValue){var r=a?t.node.splitText(e.length):null;o=m(t.node),t.node=r}return o}function u(t,e,n){var a=tt.createRange();return a.setStart(e,n),a.setEnd(e,n+t.length),a.getBoundingClientRect()}function m(t){var e=t.parentNode,n=tt.createElement("wrapper"),a=t.cloneNode(!0);n.appendChild(t.cloneNode(!0)),e.replaceChild(n,t);var o=_html2canvas.Util.Bounds(n);return e.replaceChild(a,n),o}function g(t,n,a){var o,r,u=a.ctx,m=ot(t,"color"),g=ot(t,"textDecoration"),p=ot(t,"textAlign"),f={node:n,textOffset:0};_html2canvas.Util.trimText(n.nodeValue).length>0&&(n.nodeValue=i(n.nodeValue,ot(t,"textTransform")),p=p.replace(["-webkit-auto"],["auto"]),r=!e.letterRendering&&/^(left|right|justify|auto)$/.test(p)&&l(ot(t,"letterSpacing"))?n.nodeValue.split(/(\b| )/):n.nodeValue.split(""),o=d(u,t,g,m),e.chinese&&r.forEach(function(t,e){/.*[\u4E00-\u9FA5].*$/.test(t)&&(t=t.split(""),t.unshift(e,1),r.splice.apply(r,t))}),r.forEach(function(t,e){var n=h(f,t,g,e<r.length-1);n&&(c(t,n.left,n.bottom,u),s(u,g,n,o,m))}))}function p(t,e){var n,a,o=tt.createElement("boundelement");return o.style.display="inline",n=t.style.listStyleType,t.style.listStyleType="none",o.appendChild(tt.createTextNode(e)),t.insertBefore(o,t.firstChild),a=_html2canvas.Util.Bounds(o),t.removeChild(o),t.style.listStyleType=n,a}function f(t){var e=-1,n=1,a=t.parentNode.childNodes;if(t.parentNode){for(;a[++e]!==t;)1===a[e].nodeType&&n++;return n}return-1}function w(t,e){var n,a=f(t);switch(e){case"decimal":n=a;break;case"decimal-leading-zero":n=1===a.toString().length?a="0"+a.toString():a.toString();break;case"upper-roman":n=_html2canvas.Generate.ListRoman(a);break;case"lower-roman":n=_html2canvas.Generate.ListRoman(a).toLowerCase();break;case"lower-alpha":n=_html2canvas.Generate.ListAlpha(a).toLowerCase();break;case"upper-alpha":n=_html2canvas.Generate.ListAlpha(a)}return n+=". "}function v(t,e,n){var a,o,r,i=e.ctx,l=ot(t,"listStyleType");if(/^(decimal|decimal-leading-zero|upper-alpha|upper-latin|upper-roman|lower-alpha|lower-greek|lower-latin|lower-roman)$/i.test(l)){if(o=w(t,l),r=p(t,o),d(i,t,"none",ot(t,"color")),"inside"!==ot(t,"listStylePosition"))return;i.setVariable("textAlign","left"),a=n.left,c(o,a,r.bottom,i)}}function y(e){var n=t[e];return n&&n.succeeded===!0?n.img:!1}function b(t,e){var n=Math.max(t.left,e.left),a=Math.max(t.top,e.top),o=Math.min(t.left+t.width,e.left+e.width),r=Math.min(t.top+t.height,e.top+e.height);return{left:n,top:a,width:o-n,height:r-a}}function x(t,e){var n;return e?"auto"!==t?(n=h2czContext(t),e.children.push(n),n):e:n=h2czContext(0)}function C(t,e,n,a,r){var i=o(e,"paddingLeft"),l=o(e,"paddingTop"),c=o(e,"paddingRight"),d=o(e,"paddingBottom");z(t,n,0,0,n.width,n.height,a.left+i+r[3].width,a.top+l+r[0].width,a.width-(r[1].width+r[3].width+i+c),a.height-(r[0].width+r[2].width+l+d))}function A(t){return["Top","Right","Bottom","Left"].map(function(e){return{width:o(t,"border"+e+"Width"),color:ot(t,"border"+e+"Color")}})}function S(t){return["TopLeft","TopRight","BottomRight","BottomLeft"].map(function(e){return ot(t,"border"+e+"Radius")})}function R(t,e,n,a){var o=function(t,e,n){return{x:t.x+(e.x-t.x)*n,y:t.y+(e.y-t.y)*n}};return{start:t,startControl:e,endControl:n,end:a,subdivide:function(r){var i=o(t,e,r),l=o(e,n,r),c=o(n,a,r),d=o(i,l,r),s=o(l,c,r),h=o(d,s,r);return[R(t,i,d,h),R(h,s,c,a)]},curveTo:function(t){t.push(["bezierCurve",e.x,e.y,n.x,n.y,a.x,a.y])},curveToReversed:function(a){a.push(["bezierCurve",n.x,n.y,e.x,e.y,t.x,t.y])}}}function E(t,e,n,a,o,r,i){e[0]>0||e[1]>0?(t.push(["line",a[0].start.x,a[0].start.y]),a[0].curveTo(t),a[1].curveTo(t)):t.push(["line",r,i]),(n[0]>0||n[1]>0)&&t.push(["line",o[0].start.x,o[0].start.y])}function M(t,e,n,a,o,r,i){var l=[];return e[0]>0||e[1]>0?(l.push(["line",a[1].start.x,a[1].start.y]),a[1].curveTo(l)):l.push(["line",t.c1[0],t.c1[1]]),n[0]>0||n[1]>0?(l.push(["line",r[0].start.x,r[0].start.y]),r[0].curveTo(l),l.push(["line",i[0].end.x,i[0].end.y]),i[0].curveToReversed(l)):(l.push(["line",t.c2[0],t.c2[1]]),l.push(["line",t.c3[0],t.c3[1]])),e[0]>0||e[1]>0?(l.push(["line",o[1].end.x,o[1].end.y]),o[1].curveToReversed(l)):l.push(["line",t.c4[0],t.c4[1]]),l}function k(t,e,n){var a=t.left,o=t.top,r=t.width,i=t.height,l=e[0][0],c=e[0][1],d=e[1][0],s=e[1][1],h=e[2][0],u=e[2][1],m=e[3][0],g=e[3][1],p=r-d,f=i-h,w=r-u,v=i-g;return{topLeftOuter:lt(a,o,l,c).topLeft.subdivide(.5),topLeftInner:lt(a+n[3].width,o+n[0].width,Math.max(0,l-n[3].width),Math.max(0,c-n[0].width)).topLeft.subdivide(.5),topRightOuter:lt(a+p,o,d,s).topRight.subdivide(.5),topRightInner:lt(a+Math.min(p,r+n[3].width),o+n[0].width,p>r+n[3].width?0:d-n[3].width,s-n[0].width).topRight.subdivide(.5),bottomRightOuter:lt(a+w,o+f,u,h).bottomRight.subdivide(.5),bottomRightInner:lt(a+Math.min(w,r+n[3].width),o+Math.min(f,i+n[0].width),Math.max(0,u-n[1].width),Math.max(0,h-n[2].width)).bottomRight.subdivide(.5),bottomLeftOuter:lt(a,o+v,m,g).bottomLeft.subdivide(.5),bottomLeftInner:lt(a+n[3].width,o+v,Math.max(0,m-n[3].width),Math.max(0,g-n[2].width)).bottomLeft.subdivide(.5)}}function T(t,e,n,a,o){var r=ot(t,"backgroundClip"),i=[];switch(r){case"content-box":case"padding-box":E(i,a[0],a[1],e.topLeftInner,e.topRightInner,o.left+n[3].width,o.top+n[0].width),E(i,a[1],a[2],e.topRightInner,e.bottomRightInner,o.left+o.width-n[1].width,o.top+n[0].width),E(i,a[2],a[3],e.bottomRightInner,e.bottomLeftInner,o.left+o.width-n[1].width,o.top+o.height-n[2].width),E(i,a[3],a[0],e.bottomLeftInner,e.topLeftInner,o.left+n[3].width,o.top+o.height-n[2].width);break;default:E(i,a[0],a[1],e.topLeftOuter,e.topRightOuter,o.left,o.top),E(i,a[1],a[2],e.topRightOuter,e.bottomRightOuter,o.left+o.width,o.top),E(i,a[2],a[3],e.bottomRightOuter,e.bottomLeftOuter,o.left+o.width,o.top+o.height),E(i,a[3],a[0],e.bottomLeftOuter,e.topLeftOuter,o.left,o.top+o.height)}return i}function I(t,e,n){var a,o,r,i,l,c,d=e.left,s=e.top,h=e.width,u=e.height,m=S(t),g=k(e,m,n),p={clip:T(t,g,n,m,e),borders:[]};for(a=0;4>a;a++)if(n[a].width>0){switch(o=d,r=s,i=h,l=u-n[2].width,a){case 0:l=n[0].width,c=M({c1:[o,r],c2:[o+i,r],c3:[o+i-n[1].width,r+l],c4:[o+n[3].width,r+l]},m[0],m[1],g.topLeftOuter,g.topLeftInner,g.topRightOuter,g.topRightInner);break;case 1:o=d+h-n[1].width,i=n[1].width,c=M({c1:[o+i,r],c2:[o+i,r+l+n[2].width],c3:[o,r+l],c4:[o,r+n[0].width]},m[1],m[2],g.topRightOuter,g.topRightInner,g.bottomRightOuter,g.bottomRightInner);break;case 2:r=r+u-n[2].width,l=n[2].width,c=M({c1:[o+i,r+l],c2:[o,r+l],c3:[o+n[3].width,r],c4:[o+i-n[2].width,r]},m[2],m[3],g.bottomRightOuter,g.bottomRightInner,g.bottomLeftOuter,g.bottomLeftInner);break;case 3:i=n[3].width,c=M({c1:[o,r+l+n[2].width],c2:[o,r],c3:[o+i,r+n[0].width],c4:[o+i,r+l]},m[3],m[0],g.bottomLeftOuter,g.bottomLeftInner,g.topLeftOuter,g.topLeftInner)}p.borders.push({args:c,color:n[a].color})}return p}function L(t,e){var n=t.drawShape();return e.forEach(function(t,e){n[0===e?"moveTo":t[0]+"To"].apply(null,t.slice(1))}),n}function U(t,e,n){"transparent"!==n&&(t.setVariable("fillStyle",n),L(t,e),t.fill(),Z+=1)}function _(t,e,n){var a,o,r=tt.createElement("valuewrap"),i=["lineHeight","textAlign","fontFamily","color","fontSize","paddingLeft","paddingTop","width","height","border","borderLeftWidth","borderTopWidth"];i.forEach(function(e){try{r.style[e]=ot(t,e)}catch(n){h2clog("html2canvas: Parse: Exception caught in renderFormValue: "+n.message)}}),r.style.borderColor="black",r.style.borderStyle="solid",r.style.display="block",r.style.position="absolute",(/^(submit|reset|button|text|password)$/.test(t.type)||"SELECT"===t.nodeName)&&(r.style.lineHeight=ot(t,"height")),r.style.top=e.top+"px",r.style.left=e.left+"px",a="SELECT"===t.nodeName?(t.options[t.selectedIndex]||0).text:t.value,a||(a=t.placeholder),o=tt.createTextNode(a),r.appendChild(o),at.appendChild(r),g(t,o,n),at.removeChild(r)}function z(t){t.drawImage.apply(t,Array.prototype.slice.call(arguments,1)),Z+=1}function O(t,e){var n=window.getComputedStyle(t,e);if(n&&n.content&&"none"!==n.content&&"-moz-alt-content"!==n.content){var a=n.content+"",o=a.substr(0,1);o===a.substr(a.length-1)&&o.match(/'|"/)&&(a=a.substr(1,a.length-2));var r="url"===a.substr(0,3),i=document.createElement(r?"img":"span");return i.className=rt+"-before "+rt+"-after",Object.keys(n).filter(N).forEach(function(t){i.style[t]=n[t]}),r?i.src=_html2canvas.Util.parseBackgroundImage(a)[0].args[0]:i.innerHTML=a,i}}function N(t){return isNaN(window.parseInt(t,10))}function B(t,e){var n=O(t,":before"),a=O(t,":after");(n||a)&&(n&&(t.className+=" "+rt+"-before",t.parentNode.insertBefore(n,t),J(n,e,!0),t.parentNode.removeChild(n),t.className=t.className.replace(rt+"-before","").trim()),a&&(t.className+=" "+rt+"-after",t.appendChild(a),J(a,e,!0),t.removeChild(a),t.className=t.className.replace(rt+"-after","").trim()))}function F(t,e,n,a){var o=Math.round(a.left+n.left),r=Math.round(a.top+n.top);t.createPattern(e),t.translate(o,r),t.fill(),t.translate(-o,-r)}function P(t,e,n,a,o,r,i,l){var c=[];c.push(["line",Math.round(o),Math.round(r)]),c.push(["line",Math.round(o+i),Math.round(r)]),c.push(["line",Math.round(o+i),Math.round(l+r)]),c.push(["line",Math.round(o),Math.round(l+r)]),L(t,c),t.save(),t.clip(),F(t,e,n,a),t.restore()}function V(t,e,n){r(t,e.left,e.top,e.width,e.height,n)}function G(t,e,n,a,o){var r=_html2canvas.Util.BackgroundSize(t,e,a,o),i=_html2canvas.Util.BackgroundPosition(t,e,a,o,r),l=ot(t,"backgroundRepeat").split(",").map(function(t){return t.trim()});switch(a=D(a,r),l=l[o]||l[0]){case"repeat-x":P(n,a,i,e,e.left,e.top+i.top,99999,a.height);break;case"repeat-y":P(n,a,i,e,e.left+i.left,e.top,a.width,99999);break;case"no-repeat":P(n,a,i,e,e.left+i.left,e.top+i.top,a.width,a.height);break;default:F(n,a,i,{top:e.top,left:e.left,width:a.width,height:a.height})}}function Y(t,e,n){for(var a,o=ot(t,"backgroundImage"),r=_html2canvas.Util.parseBackgroundImage(o),i=r.length;i--;)if(o=r[i],o.args&&0!==o.args.length){var l="url"===o.method?o.args[0]:o.value;a=y(l),a?G(t,e,n,a,i):h2clog("html2canvas: Error loading background:",o)}}function D(t,e){if(t.width===e.width&&t.height===e.height)return t;var n,a=tt.createElement("canvas");return a.width=e.width,a.height=e.height,n=a.getContext("2d"),z(n,t,0,0,t.width,t.height,0,0,e.width,e.height),a}function q(t,e,n){var a=ot(e,"opacity")*(n?n.opacity:1);return t.setVariable("globalAlpha",a),a}function W(t,o,r){var i=h2cRenderContext(o?r.width:n(),o?r.height:a()),l={ctx:i,zIndex:x(ot(t,"zIndex"),o?o.zIndex:null),opacity:q(i,t,o),cssPosition:ot(t,"position"),borders:A(t),clip:o&&o.clip?_html2canvas.Util.Extend({},o.clip):null};return e.useOverflow===!0&&/(hidden|scroll|auto)/.test(ot(t,"overflow"))===!0&&/(BODY)/i.test(t.nodeName)===!1&&(l.clip=l.clip?b(l.clip,r):r),l.zIndex.children.push(l),l}function X(t,e,n){var a={left:e.left+t[3].width,top:e.top+t[0].width,width:e.width-(t[1].width+t[3].width),height:e.height-(t[0].width+t[2].width)};return n&&(a=b(a,n)),a}function j(t,e,n){var a,o=_html2canvas.Util.Bounds(t),r=nt.test(t.nodeName)?"#efefef":ot(t,"backgroundColor"),i=W(t,e,o),l=i.borders,c=i.ctx,d=X(l,o,i.clip),s=I(t,o,l);switch(L(c,s.clip),c.save(),c.clip(),d.height>0&&d.width>0&&(V(c,o,r),Y(t,d,c)),c.restore(),s.borders.forEach(function(t){U(c,t.args,t.color)}),n||B(t,i),t.nodeName){case"IMG":(a=y(t.getAttribute("src")))?C(c,t,a,o,l):h2clog("html2canvas: Error loading <img>:"+t.getAttribute("src"));break;case"INPUT":/^(text|url|email|submit|button|reset)$/.test(t.type)&&(t.value||t.placeholder).length>0&&_(t,o,i);break;case"TEXTAREA":(t.value||t.placeholder||"").length>0&&_(t,o,i);break;case"SELECT":(t.options||t.placeholder||"").length>0&&_(t,o,i);break;case"LI":v(t,i,d);break;case"VIDEO":var h=document.createElement("canvas");h.width=t.videoWidth||t.clientWidth||320,h.height=t.videoHeight||t.clientHeight||240;var u=h.getContext("2d");u.drawImage(t,0,0,h.width,h.height),C(c,h,h,o,l);break;case"CANVAS":C(c,t,t,o,l)}return i}function H(t){return"none"!==ot(t,"display")&&"hidden"!==ot(t,"visibility")&&!t.hasAttribute("data-html2canvas-ignore")}function J(t,e,n){H(t)&&(e=j(t,e,n)||e,nt.test(t.nodeName)||("IFRAME"==t.tagName&&(t=t.contentDocument),_html2canvas.Util.Children(t).forEach(function(a){1===a.nodeType?J(a,e,n):3===a.nodeType&&g(t,a,e)})))}function Q(t,e){function o(t){var e,n,a,r,i,l=_html2canvas.Util.Children(t),d=l.length;for(i=0;d>i;i+=1)if(r=l[i],3===r.nodeType)c+=r.nodeValue.replace(/</g,"&lt;").replace(/>/g,"&gt;");else if(1===r.nodeType&&!/^(script|meta|title)$/.test(r.nodeName.toLowerCase())){if(c+="<"+r.nodeName.toLowerCase(),r.hasAttributes())for(e=r.attributes,a=e.length,n=0;a>n;n+=1)c+=" "+e[n].name+'="'+e[n].value+'"';c+=">",o(r),c+="</"+r.nodeName.toLowerCase()+">"}}var r=new Image,i=n(),l=a(),c="";o(t),r.src=["data:image/svg+xml,","<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='"+i+"' height='"+l+"'>","<foreignObject width='"+i+"' height='"+l+"'>","<html xmlns='http://www.w3.org/1999/xhtml' style='margin:0;'>",c.replace(/\#/g,"%23"),"</html>","</foreignObject>","</svg>"].join(""),r.onload=function(){e.svgRender=r}}function $(){var t=j(K,null);return et.svgRendering&&Q(document.documentElement,t),Array.prototype.slice.call(K.children,0).forEach(function(e){J(e,t)}),t.backgroundColor=ot(document.documentElement,"backgroundColor"),at.removeChild(it),t}var K=void 0===e.elements?document.body:e.elements[0],Z=0,tt=K.ownerDocument,et=_html2canvas.Util.Support(e,tt),nt=new RegExp("("+e.ignoreElements+")"),at=tt.body,ot=_html2canvas.Util.getCSS,rt="___html2canvas___pseudoelement",it=tt.createElement("style");it.innerHTML="."+rt+'-before:before { content: "" !important; display: none !important; }.'+rt+'-after:after { content: "" !important; display: none !important; }',at.appendChild(it),t=t||{};var lt=function(t){return function(e,n,a,o){var r=a*t,i=o*t,l=e+a,c=n+o;return{topLeft:R({x:e,y:c},{x:e,y:c-i},{x:l-r,y:n},{x:l,y:n}),topRight:R({x:e,y:n},{x:e+r,y:n},{x:l,y:c-i},{x:l,y:c}),bottomRight:R({x:l,y:n},{x:l,y:n+i},{x:e+r,y:c},{x:e,y:c}),bottomLeft:R({x:l,y:c},{x:l-r,y:c},{x:e,y:n+i},{x:e,y:n})}}}(4*((Math.sqrt(2)-1)/3));return $()},_html2canvas.Preload=function(t){function e(t){x.href=t,x.href=x.href;var e=x.protocol+x.host;return e===h}function n(){h2clog("html2canvas: start: images: "+p.numLoaded+" / "+p.numTotal+" (failed: "+p.numFailed+")"),!p.firstRun&&p.numLoaded>=p.numTotal&&(h2clog("Finished loading images: # "+p.numTotal+" (failed: "+p.numFailed+")"),"function"==typeof t.complete&&t.complete(p))}function a(e,a,o){var r,i,l=t.proxy;x.href=e,e=x.href,r="html2canvas_"+f++,o.callbackname=r,l+=l.indexOf("?")>-1?"&":"?",l+="url="+encodeURIComponent(e)+"&callback="+r,i=v.createElement("script"),window[r]=function(t){"error:"===t.substring(0,6)?(o.succeeded=!1,p.numLoaded++,p.numFailed++,n()):(s(a,o),a.src=t),window[r]=void 0;try{delete window[r]}catch(e){}i.parentNode.removeChild(i),i=null,delete o.script,delete o.callbackname},i.setAttribute("type","text/javascript"),i.setAttribute("src",l),o.script=i,window.document.body.appendChild(i)}function o(t,e){var n=window.getComputedStyle(t,e),a=n.content;"url"===a.substr(0,3)&&u.loadImage(_html2canvas.Util.parseBackgroundImage(a)[0].args[0]),c(n.backgroundImage,t)}function r(t){o(t,":before"),o(t,":after")}function i(t,e){var a=_html2canvas.Generate.Gradient(t,e);void 0!==a&&(p[t]={img:a,succeeded:!0},p.numTotal++,p.numLoaded++,n())}function l(t){return t&&t.method&&t.args&&t.args.length>0}function c(t,e){var n;_html2canvas.Util.parseBackgroundImage(t).filter(l).forEach(function(t){"url"===t.method?u.loadImage(t.args[0]):t.method.match(/\-?gradient$/)&&(void 0===n&&(n=_html2canvas.Util.Bounds(e)),i(t.value,n))})}function d(t){var e=!1;try{_html2canvas.Util.Children(t).forEach(function(t){d(t)})}catch(n){}try{e=t.nodeType}catch(a){e=!1,h2clog("html2canvas: failed to access some element's nodeType - Exception: "+a.message)}if(1===e||void 0===e){r(t);try{c(_html2canvas.Util.getCSS(t,"backgroundImage"),t)}catch(n){h2clog("html2canvas: failed to get background-image - Exception: "+n.message)}c(t)}}function s(e,o){e.onload=function(){void 0!==o.timer&&window.clearTimeout(o.timer),p.numLoaded++,o.succeeded=!0,e.onerror=e.onload=null,n()},e.onerror=function(){if("anonymous"===e.crossOrigin&&(window.clearTimeout(o.timer),t.proxy)){var r=e.src;return e=new Image,o.img=e,e.src=r,void a(e.src,e,o)}p.numLoaded++,p.numFailed++,o.succeeded=!1,e.onerror=e.onload=null,n()}}var h,u,m,g,p={numLoaded:0,numFailed:0,numTotal:0,cleanupDone:!1},f=0,w=t.elements[0]||document.body,v=w.ownerDocument,y=v.images,b=y.length,x=v.createElement("a"),C=function(t){return void 0!==t.crossOrigin}(new Image);for(x.href=window.location.href,h=x.protocol+x.host,u={loadImage:function(n){var o,r;n&&void 0===p[n]&&(o=new Image,n.match(/data:image\/.*;base64,/i)?(o.src=n.replace(/url\(['"]{0,}|['"]{0,}\)$/gi,""),r=p[n]={img:o},p.numTotal++,s(o,r)):e(n)||t.allowTaint===!0?(r=p[n]={img:o},p.numTotal++,s(o,r),o.src=n):C&&!t.allowTaint&&t.useCORS?(o.crossOrigin="anonymous",r=p[n]={img:o},p.numTotal++,s(o,r),o.src=n,o.customComplete=function(){this.img.complete?this.img.onerror():this.timer=window.setTimeout(this.img.customComplete,100)}.bind(r),o.customComplete()):t.proxy&&(r=p[n]={img:o},p.numTotal++,a(n,o,r)))},cleanupDOM:function(e){var a,o;if(!p.cleanupDone){h2clog(e&&"string"==typeof e?"html2canvas: Cleanup because: "+e:"html2canvas: Cleanup after timeout: "+t.timeout+" ms.");for(o in p)if(p.hasOwnProperty(o)&&(a=p[o],"object"==typeof a&&a.callbackname&&void 0===a.succeeded)){window[a.callbackname]=void 0;try{delete window[a.callbackname];
}catch(r){}a.script&&a.script.parentNode&&(a.script.setAttribute("src","about:blank"),a.script.parentNode.removeChild(a.script)),p.numLoaded++,p.numFailed++,h2clog("html2canvas: Cleaned up failed img: '"+o+"' Steps: "+p.numLoaded+" / "+p.numTotal)}void 0!==window.stop?window.stop():void 0!==document.execCommand&&document.execCommand("Stop",!1),void 0!==document.close&&document.close(),p.cleanupDone=!0,e&&"string"==typeof e||n()}},renderingDone:function(){g&&window.clearTimeout(g)}},t.timeout>0&&(g=window.setTimeout(u.cleanupDOM,t.timeout)),h2clog("html2canvas: Preload starts: finding background-images"),p.firstRun=!0,d(w),h2clog("html2canvas: Preload: Finding images"),m=0;b>m;m+=1)u.loadImage(y[m].getAttribute("src"));return p.firstRun=!1,h2clog("html2canvas: Preload: Done."),p.numTotal===p.numLoaded&&n(),u},_html2canvas.Renderer=function(t,e){function n(t){var e=[],n=function(t){var a=[],o=[];t.children.forEach(function(t){t.children&&t.children.length>0?(a.push(t),o.push(t.zindex)):e.push(t)}),o.sort(function(t,e){return t-e}),o.forEach(function(t){var e;a.some(function(n,a){return e=a,n.zindex===t}),n(a.splice(e,1)[0])})};return n(t.zIndex),e}function a(t){var n;if("string"==typeof e.renderer&&void 0!==_html2canvas.Renderer[t])n=_html2canvas.Renderer[t](e);else{if("function"!=typeof t)throw new Error("Unknown renderer");n=t(e)}if("function"!=typeof n)throw new Error("Invalid renderer defined");return n}return a(e.renderer)(t,e,document,n(t),_html2canvas)},_html2canvas.Util.Support=function(t,e){function n(){var t=new Image,n=e.createElement("canvas"),a=void 0===n.getContext?!1:n.getContext("2d");if(a===!1)return!1;n.width=n.height=10,t.src=["data:image/svg+xml,","<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'>","<foreignObject width='10' height='10'>","<div xmlns='http://www.w3.org/1999/xhtml' style='width:10;height:10;'>","sup","</div>","</foreignObject>","</svg>"].join("");try{a.drawImage(t,0,0),n.toDataURL()}catch(o){return!1}return h2clog("html2canvas: Parse: SVG powered rendering available"),!0}function a(){var t,n,a,o,r=!1;return e.createRange&&(t=e.createRange(),t.getBoundingClientRect&&(n=e.createElement("boundtest"),n.style.height="123px",n.style.display="block",e.body.appendChild(n),t.selectNode(n),a=t.getBoundingClientRect(),o=a.height,123===o&&(r=!0),e.body.removeChild(n))),r}return{rangeBounds:a(),svgRendering:t.svgRendering&&n()}},window.html2canvas=function(t,e){t=t.length?t:[t];var n,a,o={logging:!1,elements:t,background:"#fff",proxy:null,timeout:0,useCORS:!1,allowTaint:!1,svgRendering:!1,ignoreElements:"IFRAME|OBJECT|PARAM",useOverflow:!0,letterRendering:!1,chinese:!1,width:null,height:null,taintTest:!0,renderer:"Canvas"};return o=_html2canvas.Util.Extend(e,o),_html2canvas.logging=o.logging,o.complete=function(t){if(!("function"==typeof o.onpreloaded&&o.onpreloaded(t)===!1||(n=_html2canvas.Parse(t,o),"function"==typeof o.onparsed&&o.onparsed(n)===!1||(a=_html2canvas.Renderer(n,o),"function"!=typeof o.onrendered))))if("undefined"==typeof o.grabMouse||o.grabMouse){var e=new Image(25,25);e.onload=function(){a.getContext("2d").drawImage(e,coordX,coordY,25,25),o.onrendered(a)},e.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAZCAYAAAAxFw7TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAzZJREFUSEut1EtME1EUANBiTTFaivRDKbaFFgiILgxx0bQllYItYKFIgEYoC2oEwqeCC4gG1xg2dmEwEQMJujIxwQ24wA2uCFAB3SBBfqWuyqd/CuV634QSPgOFxElu+mZye+a++948BgAw/mccYAwGIyY7O1vR3NzSiuMLX5GiDoO8tLQ0QzAYDLW1tT2/qEgHJslk8rKtLU9odzcMTU3N7RdB6UBhRkZG6fz8QrCuzgJutwfq6xtazovSgunp6SUOhzPI5XJBr9fD9nYojHjDeVA6MJH0EMGARCIBRKC8vJygO2ZzrSUaSgumpqY+cDjWAlJpCgWSMJlMiO6EqqpMtWehtKBUKi1eXV3zI3wAEhQrJJUGseJHp6G0IE61CKfsl8lkR0CCWiyPAXeU32AwVNChdKAAwUIEfXK5/ARI0IaGRkS3vXp9ofE4SguKxWL92tpfH642LUjQ1lYr+P0Bt1abX3wYPQv04n48FSRoe/sz8Pn8G7m5uboISgfyk5OT72OF3szMzBMgk8k88qyjowPW1zddCoVCS1BaUCQSEdCTlZV18GcOh0ONq6trYGbmJ0xMTO3Z7dMwPj4B4XAYXC7XhkqlKqAFBQJBAS6KB08dClEqlTA8/JUak5cEAkHo6nppMxqN7ZWVVZ0GQ0lnRUXlC6VSVXoamI+gm/RQKEyChYU/u5gYUqvVFDo09AVsNttrHMdh3MAQYyRhxNIeX3y+QLu0tLKlVufC5OQU9Pa+/TgwMPCpv7+fAouKigG/pFX81qV4H4PBwrh8Wg95eOUtLi5vLi+v4FSHRzExRafTNZJ7NptNobOzs2C1Wp+eZx/yEhIS8jwer99ut//icOJvk+mwWCzF3NzvebPZTIF4+ILd/mMcx1ei7UOeUCjUjY19n8YvRYPJVzG4GGk9PT3vRkZGKJDH44PT6STTfxgNjGez4+4idg8Tr+8nx+KvNCcnx4y926mpMUNf33vY2wPo7n71JhpImszer4x5KFmE4zujo98m3W6ve3Dww2eNRvMEW3GLrG4kj26Vj/c5ch+Pg5t4ApXhopFWSDASMcjzg+siIKmWVJm839Nr+Hvp+Nsj4D+5Hdf43ZzjNQAAAABJRU5ErkJggg=="}else o.onrendered(a)},window.setTimeout(function(){_html2canvas.Preload(o)},0),{render:function(t,e){return _html2canvas.Renderer(t,_html2canvas.Util.Extend(e,o))},parse:function(t,e){return _html2canvas.Parse(t,_html2canvas.Util.Extend(e,o))},preload:function(t){return _html2canvas.Preload(_html2canvas.Util.Extend(t,o))},log:h2clog}},window.html2canvas.log=h2clog,window.html2canvas.Renderer={Canvas:void 0},_html2canvas.Renderer.Canvas=function(t){function e(t,e){t.beginPath(),e.forEach(function(e){t[e.name].apply(t,e.arguments)}),t.closePath()}function n(t){if(-1===i.indexOf(t.arguments[0].src)){c.drawImage(t.arguments[0],0,0);try{c.getImageData(0,0,1,1)}catch(e){return l=r.createElement("canvas"),c=l.getContext("2d"),!1}i.push(t.arguments[0].src)}return!0}function a(t){return"transparent"===t||"rgba(0, 0, 0, 0)"===t}function o(a,o){switch(o.type){case"variable":a[o.name]=o.arguments;break;case"function":if("createPattern"===o.name){if(o.arguments[0].width>0&&o.arguments[0].height>0)try{a.fillStyle=a.createPattern(o.arguments[0],"repeat")}catch(r){h2clog("html2canvas: Renderer: Error creating pattern",r.message)}}else"drawShape"===o.name?e(a,o.arguments):"drawImage"===o.name?o.arguments[8]>0&&o.arguments[7]>0&&(!t.taintTest||t.taintTest&&n(o))&&a.drawImage.apply(a,o.arguments):a[o.name].apply(a,o.arguments)}}t=t||{};var r=document,i=[],l=document.createElement("canvas"),c=l.getContext("2d"),d=t.canvas||r.createElement("canvas");return function(t,e,n,r,i){var l,c,s,h,u,m,g=d.getContext("2d");if(d.width=d.style.width=e.width||t.ctx.width,d.height=d.style.height=e.height||t.ctx.height,m=g.fillStyle,g.fillStyle=a(t.backgroundColor)&&void 0!==e.background?e.background:t.backgroundColor,g.fillRect(0,0,d.width,d.height),g.fillStyle=m,e.svgRendering&&void 0!==t.svgRender)g.drawImage(t.svgRender,0,0);else for(c=0,s=r.length;s>c;c+=1)l=r.splice(0,1)[0],l.canvasPosition=l.canvasPosition||{},g.textBaseline="bottom",l.clip&&(g.save(),g.beginPath(),g.rect(l.clip.left,l.clip.top,l.clip.width,l.clip.height),g.clip()),l.ctx.storage&&l.ctx.storage.forEach(o.bind(null,g)),l.clip&&g.restore();return h2clog("html2canvas: Renderer: Canvas renderer done - returning canvas obj"),s=e.elements.length,1===s&&"object"==typeof e.elements[0]&&"BODY"!==e.elements[0].nodeName?(u=i.Util.Bounds(e.elements[0]),h=n.createElement("canvas"),h.width=u.width,h.height=u.height,g=h.getContext("2d"),g.drawImage(d,u.left,u.top,u.width,u.height,0,0,u.width,u.height),d=null,h):d}},function(){for(var t=0,e=["ms","moz","webkit","o"],n=0;n<e.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[e[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[n]+"CancelAnimationFrame"]||window[e[n]+"RequestCancelAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,n){var a=(new Date).getTime(),o=Math.max(0,16-(a-t)),r=window.setTimeout(function(){e(a+o)},o);return t=a+o,r}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}();var IE=!!document.all;IE||document.captureEvents(Event.MOUSEMOVE),document.addEventListener("mousemove",getMouseXY,!1);var coordX=0,coordY=0;