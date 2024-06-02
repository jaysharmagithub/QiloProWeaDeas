import {useEffect, useState} from "react";
import {getLatiAndLongi, getTemperatureValues} from "../Util/Apifunction.jsx";
import {Box, Checkbox, FormControlLabel, Slider, Typography} from "@mui/material";
import {BarChart} from "@mui/x-charts";


let dailyAvgTemp = [];
let temp_2m_min = [];
let temp_2m_max = [];

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

            } catch (error) {
                throw new Error(error);
            }
        };
        getAvgTemp();
    }, [cityName]);

    return (
        <Box sx={{ width: '100%' }}>
            <BarChart
                height={300}
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
                Number of items
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
                Number of series
            </Typography>
            <Slider
                value={seriesNb}
                onChange={handleSeriesNbChange}
                valueLabelDisplay="auto"
                min={1}
                max={3}
                aria-labelledby="input-series-number"
            />
        </Box>
    );
}

const highlightScope = {
    highlighted: 'series',
    faded: 'global',
};

const series = [
    {
        label: 'series 1',
        data: dailyAvgTemp,
    },
    {
        label: 'series 2',
        data: [
            temp_2m_max,
        ],
    },
    {
        label: 'series 3',
        data: [
            temp_2m_min]
    },
].map((s) => ({ ...s, highlightScope }));