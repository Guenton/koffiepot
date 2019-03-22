const electron = require("electron");
const {ipcRenderer} = electron;

const form = document.querySelector("#percentPlusForm");
form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();
  const quarter = document.querySelector("#Quarter").value;
  const q1score = document.querySelector("#Q1Score").value;
  const q2score = document.querySelector("#Q2Score").value;
  const q3score = document.querySelector("#Q3Score").value;
  const requestedGrade = document.querySelector("#RequestedGrade").value;
  ipcRenderer.send("percentPlus:package", quarter);
}