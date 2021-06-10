/* eslint-disable prefer-destructuring */
/* eslint-disable import/prefer-default-export */
import { IpcRenderer } from 'electron'; // this is just an interface

const dialog = require('electron').remote.dialog;

export const ipcRenderer: IpcRenderer = (window as any).ipcRenderer;
