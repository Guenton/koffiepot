const electron = require("electron");
const {ipcRenderer} = electron;

const ul = document.querySelector("#DynamicBrew");

ipcRenderer.on("percentPlus:package", function(event, quarter) {
  const li = document.createElement("li");
  const itemText = document.createTextNode(quarter);
  li.appendChild(itemText);
  ul.appendChild(li);
  console.log(quarter);
});