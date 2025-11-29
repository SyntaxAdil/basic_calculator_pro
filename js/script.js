// focus before anything load
document.addEventListener("DOMContentLoaded", () => {
  displayCurrentValue.focus();
});
// varibale
const container = document.querySelector(".calculator-container");
const menuBar = document.querySelector(".calculator-menu-bar");
const menuToggleBtn = document.getElementById("menu-toogle-btn");
const themeToggle = document.getElementById("theme-toggle-btn");
const clrHistoryBtn = document.getElementById("clear-history-btn");
const closeMenuBtn = document.getElementById("close-menu-btn");

const historyContainer = document.getElementById(
  "calculator-history-container"
);
// for history
let history = JSON.parse(localStorage.getItem("history")) || [];

// funciton for render history
function renderHistory(data) {
  historyContainer.innerHTML = data
    .map(
      (i) =>
        `
    <div class="history-card">
            <h5 class="diactive"> ${i.calculation}</h5>
            <h3>${i.value}</h3>
    </div>
    `
    )
    .join("");
}

// ui call
renderHistory(history);

// pushing history
function pushHistory() {
  history.push({
    calculation: displayCurrentValue.value,
    value: displayCalculatedValue.value,
  });
  localStorage.setItem("history", JSON.stringify(history));
  renderHistory(history);
}

// delete history

function dltHistory() {
  history = [];
  localStorage.setItem("history", JSON.stringify(history));
  renderHistory(history);
}
// clear history button
clrHistoryBtn.addEventListener("click", dltHistory);

// nav handle
menuToggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  menuBar.style.width = "290px";
});
closeMenuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  menuBar.style.width = "0px";
});

container.addEventListener("click", (e) => {
  if (!menuBar.contains(e.target)) {
    menuBar.style.width = "0px";
  }
});

// funciton for claculating
let displayCurrentValue = document.getElementById("cal-display-current");
let displayCalculatedValue = document.getElementById("cal-display-calculated");
let calculateVal;

function appendValue(value) {
  const allowedKeys = "000123456789+-*/.";
  if (!allowedKeys.includes(value)) return;
  displayCalculatedValue.classList.add("diactive");
  displayCurrentValue.classList.remove("diactive");
  displayCurrentValue.classList.add("active");
  displayCurrentValue.value += value;
  displayCalculatedValue.value = "=" + eval(displayCurrentValue.value);
}

// calculate funciton

function calculate() {
  if(displayCurrentValue.value==="") return
  displayCurrentValue.classList.add("diactive");
  displayCalculatedValue.classList.remove("diactive");
  displayCalculatedValue.classList.add("active");
  displayCalculatedValue.value = "=" + eval(displayCurrentValue.value);
  pushHistory();
}

// reset funciton
function reset() {
  displayCalculatedValue.classList.remove("diactive");
  displayCalculatedValue.classList.add("active");

  displayCalculatedValue.value = "0";
  displayCurrentValue.value = "";
}

// del function

function del() {
  if (displayCurrentValue.value === "") {
    displayCalculatedValue.classList.add("active");
    return;
  }
  displayCurrentValue.classList.remove("diactive");
  displayCurrentValue.classList.add("active");
  displayCalculatedValue.classList.add("diactive");
  displayCurrentValue.value = displayCurrentValue.value.slice(0, -1);
}

// key events

displayCurrentValue.addEventListener("keydown", (e) => {
  e.preventDefault();

  if (e.key === "Backspace") del();
  else if (e.key === "Enter") calculate();
  else appendValue(e.key);
});

// theme control

// Check localStorage on page load
if (localStorage.getItem("theme") === "light") {
  document.documentElement.classList.add("theme-light");
  themeToggle.classList.add("fa-sun");
} else {
  themeToggle.classList.remove("fa-sun");
  themeToggle.classList.add("fa-moon");
}

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("theme-light");
  themeToggle.classList.toggle("fa-moon");
  themeToggle.classList.toggle("fa-sun");

  // Save theme in localStorage
  if (document.documentElement.classList.contains("theme-light")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});
