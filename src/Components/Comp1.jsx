import React from "react";
import { useState, useEffect } from "react";
import { getCurrentTemp, getLatiAndLongi } from "../Util/Apifunction";
import {dark} from "@mui/material/styles/createPalette.js";
import {color} from "framer-motion";

const Comp1 = ({ cityName }) => {
  const [temperature, setTemperature] = useState("");
   const [descrp, setDescrp] = useState("");
   const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getTemperature = async () => {
      try {
        const latiAndlangi = await getLatiAndLongi(cityName);
        console.log("This is promise");
        console.log(latiAndlangi);
        const lati = latiAndlangi.data[0].lat;
        const longi = latiAndlangi.data[0].lon;
        console.log(lati);
        console.log(longi);
        console.log(cityName);
        const response = await getCurrentTemp(lati, longi);
        console.log("Temp")
        console.log(response);
        setTemperature(response.data.main.temp);
        setDescrp(response.data.weather[0].description)
      } catch (error) {
        setErrorMessage(error.message)
      }
    };
    getTemperature();
  }, [cityName]);

  return <>{errorMessage ? (<p style={{margin:"auto"}}>{errorMessage}</p>):(temperature ? (<p>{Math.round(temperature)} °C <br/> <span style={{fontWeight:"25px", paddingTop:10, textAlign:"center"}}>{descrp}</span></p> ) :(<p>Loading</p>))}</>
};

export default Comp1;
