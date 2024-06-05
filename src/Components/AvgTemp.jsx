import React, { useEffect, useState } from "react";
import { getLatiAndLongi, getTemperatureValues } from "../Util/Apifunction";

const AvgTemp = ({ cityName }) => {
  const [avgtemp, setAvgTemp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getAvgTemp = async () => {
      try {
        const latiAndlangi = await getLatiAndLongi(cityName);
        console.log("This is promise");
        console.log(latiAndlangi);
        const lati = latiAndlangi.data[0].lat;
        const longi = latiAndlangi.data[0].lon;
        console.log(lati);
        console.log(longi);

        const response = await getTemperatureValues(lati, longi);
        console.log("this temperature");
        console.log(response);
        let avgt = 0;
        response.data.daily.temperature_2m_max.forEach((element) => {
          avgt += element;
        });
        response.data.daily.temperature_2m_min.forEach((element) => {
          avgt += element;
        });
        avgt /= 14;
        setAvgTemp(avgt);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getAvgTemp();
  }, [cityName]);

  return <div> {errorMessage ? (<p>{errorMessage}</p>):(avgtemp ? (`${Math.round(avgtemp)}°C`):(<p>Loading...</p>))}</div>;
};

export default AvgTemp;
