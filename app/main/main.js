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

  // Determine script file path
  let scriptPath = path.join(process.resourcesPath, script);
  if (fs.existsSync(scriptPath)){
    ;
  } else {
    scriptPath = path.resolve(app.getAppPath(), "src", "scripts", "print_config.py");
  }

  const command = `python ${scriptPath} ${tempFilePath}`;
  console.log(`Full command: ${command}`);

  try {
    return new Promise((resolve, reject) => {
      const python = spawn('python', [scriptPath, tempFilePath])

      let output = '';
      python.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
        output += data;
      })

      python.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
      })

      python.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`child process exited with code ${code}`))
        } else {
        // Parse the output into a 2D array
        const outputArray = JSON.parse(output);
        // Get the headers from the first row
        const headers = outputArray[0];
        // Get the rows from the rest of the array
        const rows = outputArray.slice(1);
        // Initialize the output object
        const outputObject = {};
        // Initialize an array for each header in the output object
        headers.forEach(header => {
          outputObject[header] = [];
        });
        // Add the values to the corresponding arrays in the output object
        rows.forEach(row => {
          headers.forEach((header, i) => {
            outputObject[header].push(row[i]);
          });
        });
        resolve(outputObject)
          }
      })
    })
  } catch (error) {
    console.error(`Error running python script: ${error.message}`)
  }
})