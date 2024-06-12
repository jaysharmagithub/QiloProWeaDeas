import React, { useEffect, useState } from "react";

import {
  getRelativeHumidityValues,
  getLatiAndLongi,
} from "../Util/Apifunction";
import {Box, Skeleton} from "@mui/material";

const  AvgHumidity = ({ cityName }) => {
  const [avgHumidity, setAvgHumidity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getAvgHumidity = async () => {
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


        const response = await getRelativeHumidityValues(
          formattedpreDate,
          formattedDate,
          lati,
          longi
        );
       ;

        let avgt = 0;
        let dayHumidity = 0;


        for (let index = 0; index < 7; index++) {
          let response = await getRelativeHumidityValues(
            formattedpreDate,
            formattedDate,
            lati,
            longi
          );

          response.data.hourly.relative_humidity_2m.forEach((element) => {
            dayHumidity += element;
          });
          dayHumidity = dayHumidity / 24;
          avgt += dayHumidity;
          formattedDate = formattedpreDate;
        }

        avgt = avgt / 7;
        setAvgHumidity(avgt);
      } catch (error) {
       setErrorMessage(error.message);
      }
    };
    getAvgHumidity();
  }, [cityName]);

  return <div>{errorMessage ? (<p>{errorMessage}</p>):(avgHumidity ? (`${Math.round(avgHumidity)} %`):(<Box sx={{ width: 300 }}>

    <Skeleton animation="wave" />
    <Skeleton animation={false} />
  </Box>))}</div>;
};

export default AvgHumidity;
