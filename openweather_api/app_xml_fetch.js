// XML Fetch

const getWeatherXmlFetch = () => {
  console.log("XML Fetch");
  makeNewUrl();
  fetch(xml_url)
    .then((response) => (response = response.text()))
    .then((xmlString) => new DOMParser().parseFromString(xmlString, "text/xml"))
    .then((data) => {
      const temperature = data
        .getElementsByTagName("temperature")[0]
        .getAttribute("value");
      const description = data
        .getElementsByTagName("weather")[0]
        .getAttribute("value");
      return (weather = {
        temperature: temperature,
        description: description,
      });
    })
    .then((weather) => changeIndicators(weather))
    .catch(() => changeIndicators());
};
