const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  doRun: (script, args) => ipcRenderer.invoke('run-python', script, args),
  loadExample: (example) => ipcRenderer.invoke('load-example', example)
});