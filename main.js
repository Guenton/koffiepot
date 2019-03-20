const electron = require("electron");
const url = require("url");
const path = require("path");

const {app, BrowserWindow} = electron;

let mainWIndow;

// Listen for app to be ready first
app.on("ready", function() {
  // Create new window when ready
  mainWindow = new BrowserWindow({});
  // Load html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "mainWindow.html"),
    protocol: "file:",
    slashes: true
  }));
});