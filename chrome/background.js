'use strict';

/*
function isDevMode() {
    return !('update_url' in chrome.runtime.getManifest());
}
*/

const bufferToString = (buffer) => {
  return String.fromCharCode.apply(null, new Uint16Array(buffer));
};

const stringToBuffer = (str) => {
  const buf = new ArrayBuffer(str.length * 2);
  const bufView = new Uint16Array(buf);
  for (let i=0, strLen=str.length; i<strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};

let ws = null;
(function connectToWebsocket(){
  ws = new WebSocket('ws://localhost:8888');
  ws.binaryType = 'arraybuffer';

  ws.onopen = function() {
    console.log('You\'re now CONNECTED to the server.');
  };

  ws.onmessage = function(evt) {
    console.log(bufferToString(evt.data));
  };

  ws.onclose = function(){
    console.log('You have been DISCONNECTED to the server.');
    setTimeout(connectToWebsocket, 5000);
  };
})();

chrome.webNavigation.onCompleted.addListener(function(data) {
  const http = data.url.startsWith('http://') || data.url.startsWith('https://');
  if (data.frameId !== 0 || !http) return;

  if(ws.readyState === 1) {
    ws.send(stringToBuffer(data.url));
  }
});
