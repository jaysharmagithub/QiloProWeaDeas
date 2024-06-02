import axios from "axios";

axios.defaults.maxContentLength = 500000000000000000;
const api = axios.create({
  // baseURL: "https://api.openweathermap.org/data/2.5/",
  // baseURL: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/",
  baseURL: "https://api.open-meteo.com/v1/",
});
export async function getCurrentTemp(lat, lon) {
  try {
    const data = axios.get(
      `  https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b77e8cb5ba0afdb41c9150d8b56303c9&units=metric`
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getTemperatureValues(lati, longi) {
  try {
    const data = api.get(
      `forecast?latitude=${lati}&longitude=${longi}&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FBangkok&past_days=7&forecast_days=1`
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getRainfallValues(
  previousDate,
  currentDate,
  lati,
  longi
) {
  try {
    const response = api.get(
      `forecast?latitude=${lati}&longitude=${longi}&hourly=rain&timezone=Asia%2FBangkok&start_date=${previousDate}&end_date=${currentDate}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getRelativeHumidityValues(
  previousDate,
  currentDate,
  lati,
  longi
) {
  try {
    const response = api.get(
      `forecast?latitude=${lati}&longitude=${longi}&hourly=relative_humidity_2m&timezone=Asia%2FBangkok&start_date=${previousDate}&end_date=${currentDate}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getLatiAndLongi(city) {
  try {
    const response = axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=b77e8cb5ba0afdb41c9150d8b56303c9`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
