const indicators = document.querySelector(".indicators");

const temperatureIndicator = indicators.querySelector("#temp");
const weatherIndicator = indicators.querySelector("#weatherDescription");

const buttons = document.querySelectorAll("button");

const input = document.querySelector("input");
const dropdown = document.querySelector("select");

let city;
let units;
const API_KEY = "";

let url;
let xml_url;

const req = new XMLHttpRequest();

const makeNewUrl = () => {
  city = input.value;
  units = dropdown.value;
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&APPID=${API_KEY}`;
  xml_url = url + "&mode=xml";
};

errorObj = {
  temperature: "error",
  description: "error",
};

const changeIndicators = (weather = errorObj) => {
  console.log(weather.temperature, weather.description);
  temperatureIndicator.innerHTML = weather.temperature;
  weatherIndicator.innerHTML = weather.description;
};
