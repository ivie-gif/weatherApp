import React, { useEffect, useState, FC } from "react";
import { WeatherLocations, Weather } from "../Model/Weather";
import { WeatherEntry } from "./WeatherEntry";
import { readWeather } from "../Services/ServiceWeather";
import { readForecast } from "../Services/ServiceWeather";
import "./WeatherSummary.scss";

interface WeatherSummaryProps {
  location: WeatherLocations | null;
}

export const WeatherSummary: FC<WeatherSummaryProps> = ({ location }) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Weather[] | null>(null);

  useEffect(() => {
    (async function () {
      if (location) {
        const [weather, forecast] = await Promise.all([
          readWeather(location.id),
          readForecast(location.id),
        ]);
        setWeather(weather);
        setForecast(forecast);
      }
    })();
  }, [location]);

    if (location) {
      readWeather(location.id).then((Weather) => setWeather(weather));
    }


  if (!location || !weather || !forecast) return null;

  return (
    <div>
      <hr />
      <h2>{location.name}</h2>
      <WeatherEntry weather={weather} />

      <h2>Forecast</h2>
      <div>
        <ol>
          {forecast.map((timePoint) => (
            <li key={timePoint.dt}>
              <WeatherEntry weather={timePoint} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
