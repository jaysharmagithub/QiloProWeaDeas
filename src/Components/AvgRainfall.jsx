import { useState } from "react";
import React from "react";
import { getRainfallValues, getLatiAndLongi } from "../Util/Apifunction";
import { useEffect } from "react";

const AvgRainfall = ({ cityName }) => {
  const [avgRainfall, setAvgRainfall] = useState("");
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
        const response = await getRainfallValues(
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
          let response = await getRainfallValues(
            formattedpreDate,
            formattedDate,
            lati,
            longi
          );

          response.data.hourly.rain.forEach((element) => {
            dayRainfall += element;
          });
          console.log("this is day rainfall");
          console.log(dayRainfall);
          avgt += dayRainfall;
          formattedDate = formattedpreDate;
        }
        console.log(avgt);
        avgt / 7;
        setAvgRainfall(avgt);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getAvgRainfall();
  }, [cityName]);

  return <div>{errorMessage ? (<p>{errorMessage}</p>):(avgRainfall!==0 && avgRainfall<=0 ?  (<p>Loading...</p>):(avgRainfall>=0 && (`${Math.round(avgRainfall)} mm`)))}</div>;
};
export default AvgRainfall;
