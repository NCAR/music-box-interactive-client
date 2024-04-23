const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  doRun: (script, args) => ipcRenderer.invoke("run-python", script, args),
  loadExample: (example) => ipcRenderer.invoke("load-example", example),
  getPrevResults: () => ipcRenderer.invoke("get-prev-results"),
  loadPreviousConfig: (dir) => ipcRenderer.invoke("load-previous-config", dir),
  loadPreviousResults: (dir) => ipcRenderer.invoke("load-previous-results", dir),
  saveResults: (results) => ipcRenderer.invoke("save-results", results),

  getRecentResults: (results) => ipcRenderer.invoke("get-recent-results", results),
  getDownloadPath: (path) => ipcRenderer.invoke("get-download-path", path),
  downloadResults: (filePath, csvData) => ipcRenderer.invoke("download-results", filePath, csvData),

});
