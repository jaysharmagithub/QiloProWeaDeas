import React, { useEffect, useState } from "react";

import {
  getRelativeHumidityValues,
  getLatiAndLongi,
} from "../Util/Apifunction";

const  AvgHumidity = ({ cityName }) => {
  const [avgHumidity, setAvgHumidity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getAvgRainfall = async () => {
      try {
        const latiAndlangi = await getLatiAndLongi(cityName);
        console.log("This is promise");
        console.log(latiAndlangi);
        const lati = latiAndlangi.data[0].lat;
        const longi = latiAndlangi.data[0].lon;
        console.log(lati);
        console.log(longi);
        const date = new Date();

        let formattedDate = `${date.getFullYear()}-${
          "0" + date.getMonth()
        }-${"0"+date.getDate()}`;
        let formattedpreDate = `${date.getFullYear()}-${
          "0" + date.getMonth()
        }-${"0"+(date.getDate() - 1)}`;

        console.log(formattedDate);
        console.log(formattedpreDate);
        const response = await getRelativeHumidityValues(
          formattedpreDate,
          formattedDate,
          lati,
          longi
        );
        console.log("this temperature");
        console.log(response);
        console.log(response.data.hourly.rain);

        let avgt = 0;
        let dayRainfall = 0;

        console.log("this is day rainfall");
        console.log(dayRainfall);
        for (let index = 0; index < 7; index++) {
          let response = await getRelativeHumidityValues(
            formattedpreDate,
            formattedDate,
            lati,
            longi
          );
         console.log("response",response)
          response.data.hourly.relative_humidity_2m.forEach((element) => {
            dayRainfall += element;
          });
          dayRainfall = dayRainfall / 24;
          console.log("this is day humdity");
          console.log(dayRainfall);
          avgt += dayRainfall;
          formattedDate = formattedpreDate;
        }

        avgt = avgt / 7;
        setAvgHumidity(avgt);
      } catch (error) {
       setErrorMessage(error.message);
      }
    };
    getAvgRainfall();
  }, [cityName]);

  return <div>{errorMessage ? (<p>{errorMessage}</p>):(avgHumidity ? (`${Math.round(avgHumidity)} %`):(<p>Loading...</p>))}</div>;
};

export default AvgHumidity;
