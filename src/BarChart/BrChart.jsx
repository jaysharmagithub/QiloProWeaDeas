import React, {useEffect, useState} from "react";
import {getLatiAndLongi, getTemperatureValues} from "../Util/Apifunction.jsx";
import {Box, Checkbox, FormControlLabel, Skeleton, Slider, Stack, Typography} from "@mui/material";
import {BarChart} from "@mui/x-charts";



export default function BarAnimation(cityName) {
    const [seriesNb, setSeriesNb] = useState(1);
    const [itemNb, setItemNb] = useState(5);
    const [skipAnimation, setSkipAnimation] = useState(false);
    const [dailyAvgTemp, setDailyAvgTemp] = useState([]);
    const [temp2mMax, setTemp2mMax] = useState([]);
    const [temp2mMin, setTemp2mMin] = useState([]);

    const handleItemNbChange = (event, newValue) => {
        if (typeof newValue !== 'number') {
            return;
        }
        setItemNb(newValue);
    };
    const handleSeriesNbChange = (event, newValue) => {
        if (typeof newValue !== 'number') {
            return;
        }
        setSeriesNb(newValue);
    };



    useEffect(() => {
        const getAvgTemp = async () => {
            try {
                const latiAndlangi = await getLatiAndLongi(cityName);


                const lati = latiAndlangi.data[0].lat;
                const longi = latiAndlangi.data[0].lon;


                const response = await getTemperatureValues(lati, longi);



                setTemp2mMax(response.data.daily.temperature_2m_max);
                setTemp2mMin(response.data.daily.temperature_2m_min);
                const avgTemp = response.data.daily.temperature_2m_max.map((max, index) => {
                    const min = response.data.daily.temperature_2m_min[index];
                    return (max + min) / 2;
                });
                setDailyAvgTemp(avgTemp);

                console.log("1",dailyAvgTemp);
                console.log("2",temp2mMin);
                console.log("3",temp2mMax);
            } catch (error) {
                throw new Error(error);
            }
        };
        getAvgTemp();
    }, [cityName, dailyAvgTemp, temp2mMax, temp2mMin]);

    const highlightScope = {
        highlighted: 'series',
        faded: 'global',
    };

    const series = [
        {
            label: 'Daily average temperature',
            data: dailyAvgTemp,
        },
        {
            label: 'Temperature 2m Maximum',
            data: temp2mMax,
        },
        {
            label: 'Temperature 2m Minimum',
            data: temp2mMin,
        },
    ].map((s) => ({ ...s, highlightScope }));


    return <div>
        {!cityName  ? (<Stack spacing={1}>

            <Skeleton variant="text" sx={{ fontSize: '5rem' }} />

            <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
        </Stack>) : (<Box sx={{ width: '100%' , padding: "5rem 10rem 5rem 10rem"}}>
            <BarChart
                height={500}
                series={series
                    .slice(0, seriesNb)
                    .map((s) => ({ ...s, data: s.data.slice(0, itemNb) }))}
                skipAnimation={skipAnimation}
            />
            <FormControlLabel
                checked={skipAnimation}
                control={
                    <Checkbox onChange={(event) => setSkipAnimation(event.target.checked)} />
                }
                label="skipAnimation"
                labelPlacement="end"
            />
            <Typography id="input-item-number" gutterBottom>
                Number of bars
            </Typography>
            <Slider
                value={itemNb}
                onChange={handleItemNbChange}
                valueLabelDisplay="auto"
                min={1}
                max={7}
                aria-labelledby="input-item-number"
            />
            <Typography id="input-series-number" gutterBottom>
                Number of dependent variables
            </Typography>
            <Slider
                value={seriesNb}
                onChange={handleSeriesNbChange}
                valueLabelDisplay="auto"
                min={1}
                max={3}
                aria-labelledby="input-series-number"
            />

        </Box>)}
    </div>;
}

