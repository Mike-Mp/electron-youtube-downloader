window.ipcRenderer = require('electron').ipcRenderer;
const { dialog } = require('electron').remote;
window.dialog = dialog;
