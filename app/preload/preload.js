const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  doRun: (script, args) => ipcRenderer.invoke('run-python', script, args),
  loadExample: (example) => ipcRenderer.invoke('load-example', example),
  getPrevResults: () => ipcRenderer.invoke('get-prev-results'),
  loadResultsFromFile: (file) => ipcRenderer.invoke('load-results-from-file', file),
});