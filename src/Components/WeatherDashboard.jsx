import React, { useState } from "react";
import AvgTemp from "./AvgTemp";
import AvgRainfall from "./AvgRainfall";
import AvgHumidity from "./AvgHumidity";
import Comp1 from "./Comp1";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid, Skeleton, Stack,
    TextField,
} from "@mui/material";
import WeatherCard from "./WeatherCard";
import { motion } from 'framer-motion';
import "../App.css"; // Assuming your CSS file is named styles.css
import  "../globals.css"
import  BrChart from "../BarChart/BrChart";
import Notepad from "../Notepad/Notepad.jsx";
import {getCurrentTemp, getLatiAndLongi} from "../Util/Apifunction.jsx";

const WeatherDashboard = () => {
    const [cityName, setCityName] = useState("");
    const [errormessage, setErrorMessage]=useState("");
    const [submit, setSubmit]=useState(false);

    const handleInputChange = (event) => {
        setCityName(event.target.value);
        setSubmit(false);
    };

    const handleForm = async (event) => {
        event.preventDefault();
        if(!cityName){
            console.log("city must be entered")
        }
        cityName.trim().toLowerCase();

        try {
            const latiAndlangi = await getLatiAndLongi(cityName);

            const lati = latiAndlangi.data[0].lat;
            const longi = latiAndlangi.data[0].lon;

            const response = await getCurrentTemp(lati, longi);


        } catch (error) {
            setErrorMessage(error.message);
        }
        setSubmit(true);


    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="dashboard-container"
        >
            {errormessage && console.log(errormessage)}
        <Box sx={{ flexGrow: 1, padding: '2rem' }}>
            <Box sx={{ width: '100%', maxWidth: { lg: '33%', xs: '100%' }, margin: 'auto', marginBottom: '2rem' }}>

                <form onSubmit={handleForm}>
                    <FormControl fullWidth>
                        <TextField
                            size="medium"
                            id="fullWidth"
                            label="Enter a city name"
                            type="text"
                            name="cityName"
                            value={cityName}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <FormHelperText id="my-helper-text">You can enter e.g. Pune</FormHelperText>
                        <Button color="primary" variant="outlined" type="submit" fullWidth>
                            Temperature
                        </Button>
                    </FormControl>
                </form>
            </Box>
            <Grid container spacing={3} justifyContent="center" alignItems="stretch">
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    {!cityName ? (<Stack spacing={1}>

                        <Skeleton variant="text" sx={{ fontSize: '5rem' }} />

                        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </Stack>) : (submit &&  <WeatherCard
                        title="Current Temperature"
                        value={<Comp1 cityName={cityName} />}
                        cityName={cityName}
                    />)}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    {!cityName ? (<Stack spacing={1}>

                            <Skeleton variant="text" sx={{ fontSize: '5rem' }} />
                        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                         </Stack>): ( submit &&  <WeatherCard
                        title="Avg Temp of Week"
                        value={<AvgTemp cityName={cityName} />}
                        cityName={cityName}
                    />)}
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    {!cityName ? (<Stack spacing={1}>

                        <Skeleton variant="text" sx={{ fontSize: '5rem' }} />

                        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} /> </Stack>):(submit && <WeatherCard
                        title="Avg Rainfall of Week"
                        value={<AvgRainfall cityName={cityName} />}
                        cityName={cityName}
                    />)}
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    {!cityName ? (<Stack spacing={1}>

                        <Skeleton variant="text" sx={{ fontSize: '5rem' }} />

                        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} /> </Stack>):(submit && <WeatherCard
                        title="Avg Humidity of Week"
                        value={<AvgHumidity cityName={cityName} />}
                        cityName={cityName}
                    />)}

                </Grid>
            </Grid>
        </Box>
        </motion.div>
    );
};

export default WeatherDashboard;
