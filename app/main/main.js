import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { spawn } from 'child_process';
import fs from 'fs';
import os from 'os';
import util from 'util';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "../../preload/preload.js"),
      contextIsolation: true,
    },
  });

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

// Convert fs.writeFile into a Promise-based function
const writeFile = util.promisify(fs.writeFile);

ipcMain.handle('run-python', async (event, script, args) => {
  // Generate a unique file name in the OS's default temp directory
  const tempFilePath = path.join(os.tmpdir(), `config-${Date.now()}.json`);

  // Write the args to the temp file
  await writeFile(tempFilePath, JSON.stringify(args));

  const command = `python ${script} ${tempFilePath}`;
  console.log(`Full command: ${command}`);

  try {
    return new Promise((resolve, reject) => {
      const python = spawn('python', [script, tempFilePath])

      python.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
      })

      python.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
      })

      python.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`child process exited with code ${code}`))
        } else {
          resolve()
        }
      })
    })
  } catch (error) {
    console.error(`Error running python script: ${error.message}`)
  }
})