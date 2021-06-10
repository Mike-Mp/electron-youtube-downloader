const { ipcRenderer } = require('electron');
const { dialog } = require('electron').remote;

// contextBridge.exposeInMainWorld('appRuntime', {
//   send: (channel, data) => {
//     ipcRenderer.send(channel, data);
//   },
//   subscribe: (channel, listener) => {
//     const subscription = (event, ...args) => listener(...args);
//     ipcRenderer.on(channel, subscription);

//     return () => {
//       ipcRenderer.removeListener(channel, subscription);
//     };
//   },
// });

function init() {
  window.isElectron = true;
  window.ipcRenderer = ipcRenderer;
  window.dialog = dialog;
}

init();
