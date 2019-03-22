const electron = require("electron");
const url = require("url");
const path = require("path");

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let percentPlusWindow;

// Listen for app to be ready first
app.on("ready", function() {
  // Create new window when ready
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false
    }
  });
  // Load html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "/views/koffiePot.html"),
    protocol: "file:",
    slashes: true
  }));
  // Quit app when closed
  mainWindow.on("closed", function() {
    app.quit();
  });

  // Build Menu from Template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert Menu
  Menu.setApplicationMenu(mainMenu);
});

// percentPlus Window Function Handler
function createPercentPlusWindow(){
  // Create new window when ready
  percentPlusWindow = new BrowserWindow({
    width: 300,
    height: 400,
    title: "( %+ ) Brewer"
  });
  // Load html into window
  percentPlusWindow.loadURL(url.format({
    pathname: path.join(__dirname, "/views/percentPlus.html"),
    protocol: "file:",
    slashes: true
  }));
  // Memory Management: Set window variable back to null to optimize memory
  percentPlusWindow.on("close", function() {
    percentPlusWindow = null;
  })
}

// Catch percentPlus:package
ipcMain.on("percentPlus:package", function(event, quarter) {
  mainWindow.webContents.send("percentPlus:package", quarter);
  percentPlusWindow.close();
});

// Create Menu Template
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "( %+ ) Calculator",
        click(){createPercentPlusWindow();}
      },
      {role: "reload"},
      {
        label: "Exit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click(){app.quit();}
      }
    ]
  }
];

// If Mac device fix menu issue
if (process.platform == "darwin") {
  mainMenuTemplate.unshift({});
}

// Add devTools if not in production
if(process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Nerd Stuff",
    submenu: [
      {
        label: "Toggle Developer Tools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}