const input = document.querySelector("input");

const calculator = document.querySelector(".calculator");
const buttons = calculator.querySelectorAll("button");

const defaultSetter = document.querySelector(".defaults");
const defaultButtons = defaultSetter.querySelectorAll("button");
const defaultIndicator = defaultSetter.querySelector("#default-indicator");

const resultToShow = document.querySelector(".result");
let resultShown = false;
defaultIndicator.className = "add-multiply";

const logArea = document.querySelector(".log");
const logToShow = logArea.children[1];
const clearLogButton = logArea.children[0];

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
let defaultAction = add;

input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") processData(defaultAction);
});

function processData(action) {
  if (!input.value) return;
  enteredData = input.value.trim();
  enteredData = input.value.split(" ");
  filteredNumbers = enteredData.filter((toCheck) => {
    if (!isNaN(toCheck)) return toCheck;
  });
  enteredNumbers = filteredNumbers.map((number) => +number);
  combine(enteredNumbers, action);
}

function drawLogEntry(numbers, action, result) {
  const numbersTotal = numbers.length;
  let logEntry = document.createElement("li");
  numbers.forEach((number, index) => {
    logEntry.append(`${number}`);
    if (index < numbersTotal - 1) {
      if (action === add) logEntry.append("+");
      else if (action === subtract) logEntry.append("-");
      else if (action === multiply) logEntry.append("*");
      else if (action === divide) logEntry.append("/");
    } else {
      logEntry.append(`=${result}`);
    }
  });
  logToShow.prepend(logEntry);
}

const checkResult = (result) =>
  isFinite(result) ? result : "Division by zero";

function combine(numbers, action) {
  result = numbers.reduce((prevValue, currentValue) =>
    action(prevValue, currentValue)
  );
  result = checkResult(result);
  if (!resultShown) {
    resultToShow.classList.toggle("visible");
    resultShown = true;
  }
  resultToShow.textContent = "Result: " + result;
  drawLogEntry(numbers, action, result);
}

// Calculator Buttons
buttons[0].addEventListener("click", processData.bind(this, add));
buttons[1].addEventListener("click", processData.bind(this, subtract));
buttons[2].addEventListener("click", processData.bind(this, multiply));
buttons[3].addEventListener("click", processData.bind(this, divide));

// Default Action Setter
defaultButtons[0].addEventListener("click", () => {
  defaultAction = add;
  defaultIndicator.textContent = "addition";
  defaultIndicator.className = "add-multiply";
});
defaultButtons[1].addEventListener("click", () => {
  defaultAction = subtract;
  defaultIndicator.textContent = "subtraction";
  defaultIndicator.className = "subtract-divide";
});
defaultButtons[2].addEventListener("click", () => {
  defaultAction = multiply;
  defaultIndicator.textContent = "multiplication";
  defaultIndicator.className = "add-multiply";
});
defaultButtons[3].addEventListener("click", () => {
  defaultAction = divide;
  defaultIndicator.textContent = "division";
  defaultIndicator.className = "subtract-divide";
});

clearLogButton.addEventListener("click", () => (logToShow.innerHTML = ""));
