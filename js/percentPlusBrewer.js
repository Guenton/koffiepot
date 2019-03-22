const electron = require("electron");
const {ipcRenderer} = electron;

// html hooks
const docForm = document.querySelector("#percentPlusForm");
const docUl = document.querySelector("#DynamicBrew");

// init variables
let currentQuarter;
let q1score;
let q2score;
let q3score;
let requestedGrade;
let calculatedGrade;
let package = {};

// Variable setter
const setVariables = () => {
  currentQuarter = document.querySelector("#Quarter").value;
  q1score = document.querySelector("#Q1Score").value;
  q2score = document.querySelector("#Q2Score").value;
  q3score = document.querySelector("#Q3Score").value;
  requestedGrade = document.querySelector("#RequestedGrade").value;
}
// Quarter-specific calculators
const q1Calculator = () => {
  switch (requestedGrade) {
    case "A": calculatedGrade=31.50; break;
    case "B": calculatedGrade=31.49; break;
    case "C": calculatedGrade=27.74; break;
    case "D": calculatedGrade=23.74; break;
    case "E": calculatedGrade=19.99;
  }
}
const q2Calculator = () => {
  switch (requestedGrade) {
    case "A": calculatedGrade=(63.00-q1score); break;
    case "B": calculatedGrade=(62.99-q1score); break;
    case "C": calculatedGrade=(55.49-q1score); break;
    case "D": calculatedGrade=(47.49-q1score); break;
    case "E": calculatedGrade=(39.99-q1score);
  }
}
const q3Calculator = () => {
  switch (requestedGrade) {
    case "A": calculatedGrade=(94.50-q1score-q2score); break;
    case "B": calculatedGrade=(94.49-q1score-q2score); break;
    case "C": calculatedGrade=(83.24-q1score-q2score); break;
    case "D": calculatedGrade=(71.24-q1score-q2score); break;
    case "E": calculatedGrade=(59.99-q1score-q2score);
  }
}
const q4Calculator = () => {
  switch (requestedGrade) {
    case "A": calculatedGrade=(126.00-q1score-q2score-q3score); break;
    case "B": calculatedGrade=(125.99-q1score-q2score-q3score); break;
    case "C": calculatedGrade=(110.99-q1score-q2score-q3score); break;
    case "D": calculatedGrade=(94.99-q1score-q2score-q3score); break;
    case "E": calculatedGrade=(79.99-q1score-q2score-q3score);
  }
}
// Package preparation handler
const packager = () => {
  package["curQrt"] = currentQuarter;
  package["reqGrd"] = requestedGrade;
  package["calGrd"] = calculatedGrade;
  if (q1score) {package["q1score"] = q1score;}
  if (q2score) {package["q2score"] = q2score;}
  if (q3score) {package["q3score"] = q3score;}
}
const ulPopulator = (package) => {
  while (docUl.firstChild) {
    docUl.removeChild(docUl.firstChild);
  }
  for (const key in package) {
    const li = document.createElement("li");
    const liContent = document.createTextNode(package[key]);
    li.appendChild(liContent);
    docUl.appendChild(li);
  }
}

// Form submit handler
const submitForm = event => {
  event.preventDefault();
  setVariables();
  switch (currentQuarter) {
    case "1": q1Calculator(); break;
    case "2": q2Calculator(); break;
    case "3": q3Calculator(); break;
    case "4": q4Calculator();
  }
  packager();
  ulPopulator(package);
  //ipcRenderer.send("percentPlus:package", package);
}

// entry point
docForm.addEventListener("submit", submitForm);