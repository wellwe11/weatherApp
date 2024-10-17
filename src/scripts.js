import { API_GIPHY_KEY, API_WEATHER_KEY } from "./configData";

// get img data from giphy
async function loadImg(source) {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=${API_GIPHY_KEY}&s=${source}`,
    { mode: "cors" }
  );

  const imgData = await response.json();
  console.log("giphy", imgData);
}

async function loadWeather(city) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${API_WEATHER_KEY}
`,
    { mode: "cors" }
  );
  const imgData = await response.json();
  let celcious = parseInt((imgData.currentConditions.temp - 32) / (9 / 5));
  let tempLowest = parseInt((imgData.days[0].tempmin - 32) / (9 / 5));
  let tempHighest = parseInt((imgData.days[0].tempmax - 32) / (9 / 5));
  console.log(tempLowest, tempHighest);
  console.log(imgData);
  console.log("weather", imgData.currentConditions.temp, "-", celcious);
  console.log("city", imgData.address);
  console.log("condition", imgData.currentConditions.icon);

  const cityText = skipDocu("#basicInfo h2");
  const cityClouds = skipDocu("#basicInfo h3");
  const cityTemp = skipDocu("#basicInfo h1");
  const cityHL = skipDocu("#basicInfo h5");
  changeText(cityText, imgData.address);
  changeText(cityClouds, imgData.currentConditions.icon);
  changeText(cityTemp, celcious);
  changeText(cityHL, `${tempLowest}/${tempHighest}`);
}

const changeText = (element, text) => {
  return (element.textContent = text);
};

const skipDocu = (id) => document.querySelector(id);

loadImg("hulk");
loadWeather("Leipzig");
