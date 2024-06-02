import React, { useState, useEffect } from "react";
import { getCurrentTemp, getLatiAndLongi } from "../Util/Apifunction";

// Import all images
import BrightSunnyFairFineClear from "../assets/BrightSunnyFairFineClear/Day.png";
import MostlyCloudy from "../assets/MostlyCloudy/day.png";
import NoPrecipitation from "../assets/NoPrecipation/day.png";
import SunnyPeriodsPartlyCloudyPartlyBrightMild from "../assets/SunnyPeriodsPartlyCloudyPartlyBrightMild/Day.png";
import BlowingSnowBlizzardSnowdriftSnowstorm from "../assets/BlowingSnowBlizzardSnowdriftSnowstorm.png";
import Breeze from "../assets/breeze.png";
import ColdChilly from "../assets/ColdChilly.png";
import DrizzleLightRain from "../assets/Dizzle.png";
import Dry from "../assets/Dry.png";
import FogVisibleLow from "../assets/fogvisiblelow.png";
import Gale from "../assets/Gale.png";
import Hail from "../assets/Hail.png";
import HeavyRain from "../assets/Heavyrain.png";
import Hot from "../assets/Hot.png";
import Humid from "../assets/humid.png";
import LightBreeze from "../assets/lightbreeze.png";
import LightSnow from "../assets/LightSnow.png";
import MistModerateVis from "../assets/mistModerVis.png";
import ModerateRain from "../assets/moderatrain.png";
import NoWind from "../assets/Nowind.png";
import Rain from "../assets/Rain.png";
import SandstormDuststormSandDust from "../assets/SandstormDuststormSandDust.png";
import SnowHeavySnowSnowfall from "../assets/SnowHeavySnowSnowfall.png";
import SnowShowersFlurries from "../assets/SnowShowersFlurries.png";
import ThunderstormsThundershowersStormLightning from "../assets/ThunderstormsThundershowersStormLightning.png";
import Warm from "../assets/warm.png";

const ImageComponent = ({ cityName }) => {
  const [img, setImg] = useState(null);
  const [descrp, setDescrp] = useState("");

  useEffect(() => {
    const getWeatherImg = async () => {
      try {
        const latiAndlangi = await getLatiAndLongi(cityName);
        const lati = latiAndlangi.data[0].lat;
        const longi = latiAndlangi.data[0].lon;
        const response = await getCurrentTemp(lati, longi);
        const weatherID= response.data.weather[0].id;
        console.log("WEathereId",weatherID);
        switch (weatherID) {
          case 200:
            setImg(Rain);
            setDescrp("Thunderstorm with light rain");
            break;
          case 201:
            setImg(ThunderstormsThundershowersStormLightning);
            setDescrp("Thunderstorm with rain");
            break;
          case 202:
            setImg(ThunderstormsThundershowersStormLightning);
            setDescrp("Thunderstorm with heavy rain");
            break;
          case 210:
            setImg(ThunderstormsThundershowersStormLightning);
            setDescrp("Light thunderstorm");
            break;
          case 211:
            setImg(ThunderstormsThundershowersStormLightning);
            setDescrp("Thunderstorm");
            break;
          case 212:
            setImg(ThunderstormsThundershowersStormLightning);
            setDescrp("Heavy thunderstorm");
            break;
          case 221:
            setImg(ThunderstormsThundershowersStormLightning);
            setDescrp("Ragged thunderstorm");
            break;
          case 230:
            setImg(ThunderstormsThundershowersStormLightning);
            setDescrp("Thunderstorm with light drizzle");
            break;
          case 231:
            setImg(ThunderstormsThundershowersStormLightning);
            setDescrp("Thunderstorm with drizzle");
            break;
          case 232:
            setImg(ThunderstormsThundershowersStormLightning);
            setDescrp("Thunderstorm with heavy drizzle");
            break;
          case 300:
            setImg(DrizzleLightRain);
            setDescrp("Light intensity drizzle");
            break;
          case 301:
            setImg(DrizzleLightRain);
            setDescrp("Drizzle");
            break;
          case 302:
            setImg(DrizzleLightRain);
            setDescrp("Heavy intensity drizzle");
            break;
          case 310:
            setImg(DrizzleLightRain);
            setDescrp("Light intensity drizzle rain");
            break;
          case 311:
            setImg(DrizzleLightRain);
            setDescrp("Drizzle rain");
            break;
          case 312:
            setImg(DrizzleLightRain);
            setDescrp("Heavy intensity drizzle rain");
            break;
          case 313:
            setImg(DrizzleLightRain);
            setDescrp("Shower rain and drizzle");
            break;
          case 314:
            setImg(DrizzleLightRain);
            setDescrp("Heavy shower rain and drizzle");
            break;
          case 321:
            setImg(DrizzleLightRain);
            setDescrp("Shower drizzle");
            break;
          case 500:
            setImg(Rain);
            setDescrp("Light rain");
            break;
          case 501:
            setImg(Rain);
            setDescrp("Moderate rain");
            break;
          case 502:
            setImg(Rain);
            setDescrp("Heavy intensity rain");
            break;
          case 503:
            setImg(Rain);
            setDescrp("Very heavy rain");
            break;
          case 504:
            setImg(Rain);
            setDescrp("Extreme rain");
            break;
          case 511:
            setImg(Rain);
            setDescrp("Freezing rain");
            break;
          case 520:
            setImg(Rain);
            setDescrp("Light intensity shower rain");
            break;
          case 521:
            setImg(Rain);
            setDescrp("Shower rain");
            break;
          case 522:
            setImg(Rain);
            setDescrp("Heavy intensity shower rain");
            break;
          case 531:
            setImg(Rain);
            setDescrp("Ragged shower rain");
            break;
          case 600:
            setImg(SnowHeavySnowSnowfall);
            setDescrp("Light snow");
            break;
          case 601:
            setImg(SnowHeavySnowSnowfall);
            setDescrp("Snow");
            break;
          case 602:
            setImg(SnowHeavySnowSnowfall);
            setDescrp("Heavy snow");
            break;
          case 611:
            setImg(SnowHeavySnowSnowfall);
            setDescrp("Sleet");
            break;
          case 612:
            setImg(SnowHeavySnowSnowfall);
            setDescrp("Light shower sleet");
            break;
          case 613:
            setImg(SnowHeavySnowSnowfall);
            setDescrp("Shower sleet");
            break;
          case 615:
            setImg(SnowHeavySnowSnowfall);
            setDescrp("Light rain and snow");
            break;
          case 616:
            setImg(SnowHeavySnowSnowfall);
            setDescrp("Rain and snow");
            break;
          case 620:
            setImg(SnowHeavySnowSnowfall);
            setDescrp("Light shower snow");
            break;
          case 621:
            setImg(SnowHeavySnowSnowfall);
            setDescrp("Shower snow");
            break;
          case 622:
            setImg(SnowHeavySnowSnowfall);
            setDescrp("Heavy shower snow");
            break;
          case 701:
            setImg(MistModerateVis);
            setDescrp("Mist");
            break;
          case 711:
            setImg(MistModerateVis);
            setDescrp("Smoke");
            break;
          case 721:
            setImg(MistModerateVis);
            setDescrp("Haze");
            break;
          case 731:
            setImg(SandstormDuststormSandDust);
            setDescrp("Sand/dust whirls");
            break;
          case 741:
            setImg(FogVisibleLow);
            setDescrp("Fog");
            break;
          case 751:
            setImg(SandstormDuststormSandDust);
            setDescrp("Sand");
            break;
          case 761:
            setImg(SandstormDuststormSandDust);
            setDescrp("Dust");
            break;
          case 762:
            setImg(SandstormDuststormSandDust);
            setDescrp("Volcanic ash");
            break;
          case 771:
            setImg(SandstormDuststormSandDust);
            setDescrp("Squalls");
            break;
          case 781:
            setImg(SandstormDuststormSandDust);
            setDescrp("Tornado");
            break;
          case 800:
            setImg(BrightSunnyFairFineClear);
            setDescrp("Clear");
            break;
          case 801:
            setImg(MostlyCloudy);
            setDescrp("Few clouds: 11-25%");
            break;
          case 802:
            setImg(MostlyCloudy);
            setDescrp("Scattered clouds: 25-50%");
            break;
          case 803:
            setImg(MostlyCloudy);
            setDescrp("Broken clouds: 51-84%");
            break;
          case 804:
            setImg(MostlyCloudy);
            setDescrp("Overcast clouds: 85-100%");
            break;
          default:
            setImg(MostlyCloudy);
            setDescrp("Unknown weather condition");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    getWeatherImg();
  }, [cityName]);

  return img;
};

export default ImageComponent;
