// Promise

const getWeatherJsonPromise = () => {
  console.log("JSON Promise");
  makeNewUrl();
  getWeatherPromise()
    .then((data) => {
      changeIndicators({
        temperature: data.main.temp,
        description: data.weather[0].description,
      });
    })
    .catch(() => changeIndicators());
};

function getWeatherPromise() {
  req.open("GET", url);
  req.send();
  return new Promise((resolve, reject) => {
    req.onload = () => {
      if (req.status === 200) {
        weatherData = JSON.parse(req.responseText);
        resolve(weatherData);
      } else {
        reject();
      }
    };
  });
}
