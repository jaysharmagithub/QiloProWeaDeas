import { useState } from "react";
import React from "react";
import { getRainfallValues, getLatiAndLongi } from "../Util/Apifunction";
import { useEffect } from "react";
import {Box, Skeleton} from "@mui/material";

const AvgRainfall = ({ cityName }) => {
  const [avgRainfall, setAvgRainfall] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const getAvgRainfall = async () => {
      try {
        const latiAndlangi = await getLatiAndLongi(cityName);
        const lati = latiAndlangi.data[0].lat;
        const longi = latiAndlangi.data[0].lon;
        const date = new Date();

        let formattedDate = `${date.getFullYear()}-${
            (date.getMonth()> 9 ? ( date.getMonth()+1):("0"+(date.getMonth()+1) ))
        }-${(date.getDate() > 9 ? ( date.getDate()):("0"+date.getDate() ))}`;
        let formattedpreDate = `${date.getFullYear()}-${
            (date.getMonth()> 9 ? ( date.getMonth()+1):("0"+(date.getMonth()+1) ))
        }-${(date.getDate() > 9 ? ( date.getDate()-1):("0"+date.getDate() - 1))}`;


        const response = await getRainfallValues(
          formattedpreDate,
          formattedDate,
          lati,
          longi
        );
        ;

        let avgt = 0;
        let dayRainfall = 0;


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

          avgt += dayRainfall;
          formattedDate = formattedpreDate;
        }

        avgt = avgt / 7;
        setAvgRainfall(avgt);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getAvgRainfall();
  }, [cityName]);

  return <div>{errorMessage ? (<p>{errorMessage}</p>):(avgRainfall!==0 && avgRainfall<=0 ?  (<Box sx={{ width: 300 }}>

    <Skeleton animation="wave" />
    <Skeleton animation={false} />
  </Box>):(avgRainfall>=0 && (`${Math.round(avgRainfall)} mm`)))}</div>;
};
export default AvgRainfall;
