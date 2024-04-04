import { app, BrowserWindow } from "electron";
import * as path from "path";

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({});

  // Vite dev server URL
  // Determine the correct URL based on the environment
  const isDev = process.env.NODE_ENV === "development";
  const url = isDev
    ? "http://localhost:5173"
    : `file://${path.join(__dirname, "../renderer/index.html")}`;

  mainWindow.loadURL(url);
  mainWindow.on("closed", () => (mainWindow = null));
}

console.log("running app");

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow == null) {
    createWindow();
  }
});
