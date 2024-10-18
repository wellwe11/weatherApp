import { API_WEATHER_KEY } from "./configData";

const loadWeather = async (city) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${API_WEATHER_KEY}
`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    console.log(weatherData);
    return {
      weatherData,
    };
  } catch (error) {
    console.error("error:", error);
    return null;
  }
};

const getInput = async () => {
  let inputValue = document.querySelector("#inputDiv input").value;
  if (!inputValue) {
    console.log("no input");
  } else {
    await applyData();
  }
};

const fetchData = async (value) => {
  let result = await loadWeather(value);
  if (result) {
    let cityName = result.weatherData.address;

    let weatherConds = result.weatherData.currentConditions.icon;

    // calculates fahrenheit as celcious
    let currTemp = Math.round(
      (result.weatherData.currentConditions.temp - 32) / (9 / 5)
    );

    // calculates fahrenheit as celcious
    let highLow = `L:${Math.round(
      (result.weatherData.days[0].tempmin - 32) / (9 / 5)
    )}  H:${Math.round((result.weatherData.days[0].tempmax - 32) / (9 / 5))}`;

    return {
      cityName,
      weatherConds,
      currTemp,
      weatherConds,
      highLow,
    };
  }
};

// update text for contentContainerOne
const changeText = (element, text) => {
  return (element.textContent = text);
};

// shortens document.querySelector
const skipDocu = (id) => document.querySelector(id);

const applyData = async () => {
  const element = await fetchData(
    document.querySelector("#inputDiv input").value
  );
  changeText(
    skipDocu("#basicInfo h2"),
    element.cityName.charAt(0).toUpperCase() + element.cityName.slice(1)
  );
  changeText(
    skipDocu("#basicInfo h3"),
    element.weatherConds.charAt(0).toUpperCase() + element.weatherConds.slice(1)
  );
  changeText(skipDocu("#basicInfo h1"), element.currTemp);
  changeText(skipDocu("#basicInfo h5"), element.highLow);
};

document.querySelector("#inputDiv button").addEventListener("click", getInput);
