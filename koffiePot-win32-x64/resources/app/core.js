const electron = require("electron");
const url = require("url");
const path = require("path");

const {app, BrowserWindow, Menu} = electron;
const nativeImage = electron.nativeImage;

let mainWindow;
let percentPlusWindow;

let potImage = nativeImage.createFromPath(path.join(__dirname, "/icons/pot.png"));

// Listen for app to be ready first
app.on("ready", function() {
  // Create new window when ready
  mainWindow = new BrowserWindow({
    width: 900,
    height: 771,
    icon: potImage,
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false
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
    width: 350,
    height: 450,
    title: "( %+ ) Brewer",
    icon: potImage,
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false
    }
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

// Create Menu Template
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {role: "reload"},
      {
        label: "Exit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click(){app.quit();}
      }
    ]
  },
  {
    label: "Calculators",
    submenu: [
      {
        label: "( %+ ) Calculator",
        click(){createPercentPlusWindow();}
      },
      {label: "( %- ) Calculator"},
      {label: "( #+ ) Calculator - in development"},
      {label: "( #- ) Calculator - in development"},
      {label: "( NC+ ) Calculator - in development"},
      {label: "( NC- ) Calculator - in development"},
      {label: "( M ) Calculator - in development"},
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