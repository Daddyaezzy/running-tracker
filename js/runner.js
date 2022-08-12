let goal = 25;
let totalValue;

function update() {
  if (totalValue >= 25) {
    goal = 100;
    document.getElementById("target").innerHTML = goal;
  }
  if (totalValue >= 100) {
    goal = 200;
    document.getElementById("target").innerHTML = goal;
  }
}
let entries = [];
const entriesWrapper = document.querySelector("#entries");

document.getElementById("target").innerHTML = goal;

function reducer(total, currentvalue) {
  return total + currentvalue;
}
function calcGoal() {
  totalValue = entries.reduce(reducer);
  const completedPercent = totalValue / (goal / 100);
  const progressCircle = document.querySelector("#progressCircle");
  //if (completedPercent > 100) completedPercent === 100;
  progressCircle.style.background = `conic-gradient(#70db70 ${completedPercent}%, #2d3740 ${completedPercent}%  )`;
}

function calcTotal() {
  totalValue = entries.reduce(reducer);
  document.getElementById("total").innerHTML = totalValue;
  document.getElementById("totalProgress").innerHTML = totalValue;
}

function calcAverage() {
  const totalAverage = (entries.reduce(reducer) / entries.length).toFixed(1);
  document.getElementById("average").innerHTML = totalAverage;
}

function calcHigh() {
  const high = Math.max(...entries);
  document.getElementById("thisWeek").innerHTML = high;
}

function addNewEntries(newEntries) {
  entriesWrapper.removeChild(
    document.querySelector("#entries").firstElementChild
  );
  const listItem = document.createElement("li");
  const listValue = document.createTextNode(newEntries.toFixed(1));
  listItem.appendChild(listValue);

  entriesWrapper.appendChild(listItem);
}

function handleSubmit(event) {
  event.preventDefault();
  const entry = Number(document.querySelector("#entry").value);
  if (!entry) return;
  document.querySelector("form").reset();
  entries.push(entry);
  addNewEntries(entry);
  calcTotal();
  calcAverage();
  update();
  calcGoal();
  calcHigh();
}

const form = document
  .querySelector("form")
  .addEventListener("submit", handleSubmit);
