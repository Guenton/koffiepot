// html hooks
const docForm = document.querySelector("#percentPlusForm");
const docQuarter = document.querySelector("#Quarter");
const docCircle = document.querySelector("#DynamicBrew");
const docQ1 = document.querySelector("#Q1");
const docQ2 = document.querySelector("#Q2");
const docQ3 = document.querySelector("#Q3");

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
// Refresh data in result circle
const circlePopulator = () => {
  docCircle.innerHTML = "";
  docCircle.innerHTML = calculatedGrade.toFixed(2);
}
// Quarter change handler
const displayAdjust = () => {
  setVariables();
  switch (currentQuarter) {
    case "1":
      docQ1.hidden = true;
      q1score = undefined;
      docQ2.hidden = true;
      q2score = undefined;
      docQ3.hidden = true;
      q3score = undefined;
      break;
    case "2":
      docQ1.hidden = false;
      docQ2.hidden = true;
      q2score = undefined;
      docQ3.hidden = true;
      q3score = undefined;
      break;
    case "3":
      docQ1.hidden = false;
      docQ2.hidden = false;
      docQ3.hidden = true;
      q3score = undefined;
      break;
    case "4":
      docQ1.hidden = false;
      docQ2.hidden = false;
      docQ3.hidden = false;
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
  circlePopulator();
}
// Listen for change of Quarter input and adjust form
docQuarter.addEventListener("change", displayAdjust);
// Listen for submit button press then fire submit handler
docForm.addEventListener("submit", submitForm);
// Wait for Dom to load to adjust display
document.addEventListener("DOMContentLoaded", () => {
  // Grab select boxes and customize
  let elems = document.querySelectorAll("select");
  let instances = M.FormSelect.init(elems);
  // hide conditional inputs
  docQ1.hidden = true;
  docQ2.hidden = true;
  docQ3.hidden = true;
});