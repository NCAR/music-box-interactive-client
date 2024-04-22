const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  doRun: (script, args) => ipcRenderer.invoke("run-python", script, args),
  loadExample: (example) => ipcRenderer.invoke("load-example", example),
  getPrevResults: () => ipcRenderer.invoke("get-prev-results"),
  loadPreviousConfig: (dir) => ipcRenderer.invoke("load-previous-config", dir),
  loadPreviousResults: (dir) => ipcRenderer.invoke("load-previous-results", dir),
  saveResults: (results) => ipcRenderer.invoke("save-results", results),
});
