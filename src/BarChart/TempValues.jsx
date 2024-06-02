import React, { useEffect, useState } from "react";
import { getLatiAndLongi, getTemperatureValues } from "../Util/Apifunction";

const TempValues = ({ cityName }) => {
    const [avgtemp, setAvgTemp] = useState("");

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
                let temp_2m_min = [];

                response.data.daily.temperature_2m_max.forEach((element) => {
                    avgt += element;
                });
                response.data.daily.temperature_2m_min.forEach((element) => {
                    avgt += element;
                });
                let dailyAvgTemp = [];
                response.data.daily.forEach((element) =>{
                    dailyAvgTemp.push(response.data.daily.temperature_2m_min[element]+response.data.daily.temperature_2m_max[element]/2);
                });
                avgt /= 14;
                setAvgTemp(avgt);
            } catch (error) {
                throw new Error(error);
            }
        };
        getAvgTemp();
    }, [cityName]);

    return <div> {avgtemp ? (`${Math.round(avgtemp)}°C`):(<p>Loading...</p>)}</div>;
};

export default TempValues;
