import React from "react";
import { useState, useEffect } from "react";
import { getCurrentTemp, getLatiAndLongi } from "../Util/Apifunction";

const Comp1 = ({ cityName }) => {
  const [temperature, setTemperature] = useState("");
   const [descrp, setDescrp] = useState("");

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
        console.error(error.message);
      }
    };
    getTemperature();
  }, [cityName]);

  return <>{temperature ? (`${Math.round(temperature)} °C`) :(<p>Loading</p>)}</>
};

export default Comp1;
