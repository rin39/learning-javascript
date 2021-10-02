const buttons = document.querySelectorAll(".calculate-button");
const formulaButton = document.querySelector("#toggle-formula");
const inputs = document.querySelectorAll("input");

const resultField = document.querySelector(".result");
const formulaField = document.querySelector(".formula");

let num1;
let num2;
let result;
let formulaToShow;
let resultVisible = false;

const drawResult = (res) => {
  resultField.textContent = "Answer: " + res;
  if (!resultVisible) {
    resultField.classList.toggle("visible");
    resultVisible = true;
  }
  return true;
};

const checkNumber = (num) => (isFinite(num) ? +num.toFixed(2) : false);

function showFormula(a, b, i) {
  console.log(i);
  switch (i) {
    case 0:
      formulaToShow = `${a} / 100 * ${b}`;
      break;
    case 2:
      formulaToShow = `100 / (${b} / ${a})`;
      break;
    case 4:
      formulaToShow = `${b} / 100 * ${a} + ${b}`;
      break;
    case 6:
      formulaToShow = `${b} - (${b} / 100 * ${a})`;
      break;
  }
  formulaField.textContent = formulaToShow;
}

function calculate(i, formula) {
  num1 = inputs[i].value;
  num2 = inputs[i + 1].value;
  result = formula(num1, num2);
  result = checkNumber(result);
  result && drawResult(result) && showFormula(num1, num2, i);
}

buttons[0].addEventListener(
  "click",
  calculate.bind(this, 0, (a, b) => (a / 100) * b)
);
buttons[1].addEventListener(
  "click",
  calculate.bind(this, 2, (a, b) => 100 / (b / a))
);
buttons[2].addEventListener(
  "click",
  calculate.bind(this, 4, (a, b) => (b / 100) * a + +b)
);
buttons[3].addEventListener(
  "click",
  calculate.bind(this, 6, (a, b) => b - (b / 100) * a)
);
formulaButton.addEventListener("click", () => {
  formulaField.classList.toggle("visible");
});
