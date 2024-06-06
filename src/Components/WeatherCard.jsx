import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader, CardMedia,
    Collapse,
    IconButton, styled,
    Typography,
    useTheme
} from "@mui/material";
import {color, motion} from "framer-motion";
import React, {useEffect, useState} from "react";
import {red} from "@mui/material/colors";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ImageComponent from "./ImageComponent.jsx";
import  Rain from "../assets/Rain.png"
import "../App.css";
import TodayIcon from '@mui/icons-material/Today';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const WeatherCard = ({title, value, cityName}) => {
    const theme = useTheme();
    const [date, setDate]=useState({
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })

    useEffect(()=> {
        const currentDate = date.day + 1;
        if(currentDate === 30 || currentDate === 31) { const currentMonth =date.month+1;
            if(currentMonth === 12) {const currentYear = date.year+1;
                setDate({...date, day:[currentDate], month: [currentMonth], year:[currentYear]});}

        }




    },[date]);
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const imageUrl = ImageComponent({ cityName });
    return (
        <motion.div initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.,type: "spring", stiffness: 300}}            whileHover={{scale: 1.05}}


            style={{margin: "10px", flexGrow: 1}}>

            <Card className="card-shadow"
                sx={{
                    minWidth: 275,
                    minHeight: cityName ? '650px' : 'auto',
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    justifyContent: "center",
                    paddingTop: 0,
                    padding:"5px",
                }} variant="outlined">
                {<h2 style={{textAlign:"center", margin:"auto", padding:0}}>{title}</h2>}
                <CardHeader style={{display:"flex", justifyContent: "space-between", alignItems: "center",paddingTop:0 }}

                    avatar={
                        <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                            <TodayIcon></TodayIcon>
                        </Avatar>
                    }
                    action={
                        <IconButton sx={{marginTop:"25px"}} aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                            title={<p style={{fontSize:"30px", margin:0}}>{cityName}</p>}

                            subheader={<p>
                            {/*    `${new Date().getFullYear()}-${*/}
                            {/*    "0" + new Date().getMonth()*/}
                            {/*}-${"0"+new Date().getDate()}`*/} {"0"+date.day+" /"+"0"+date.month+" /"+date.year}
                            </p>}


                /><CardMedia
                component="img"
                height="170"
                image={imageUrl ? (imageUrl):(<p>Loading</p>)}
                alt="Weather" style={{ maxWidth: '100%', height: 'auto' }}
            />
                <CardContent>

                    <Typography variant="h5" color="text.secondary">{value}</Typography>
                </CardContent>
                <CardActions disableSpacing justifyContent="space-betweeen">
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {title}
                    </CardContent>
                </Collapse>
            </Card>
        </motion.div>
    );



};

export default WeatherCard;
