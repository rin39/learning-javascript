// Callback

const getWeatherJsonCallback = () => {
  console.log("JSON Callback");
  makeNewUrl();
  getWeatherCallback(
    (data) => {
      changeIndicators({
        temperature: data.main.temp,
        description: data.weather[0].description,
      });
    },
    () => changeIndicators()
  );
};

const getWeatherCallback = (callback, errorCallback) => {
  req.open("GET", url);
  req.send();
  req.onload = () => {
    if (req.status === 200) {
      weatherData = JSON.parse(req.responseText);
      callback(weatherData);
    } else {
      errorCallback();
    }
  };
};
