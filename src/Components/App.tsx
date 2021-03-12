import React, { FC, useState } from "react";
import { LocationSearch } from "./LocationSearch";
import { LocationTable } from "./Location";
import { WeatherLocations } from "../Model/Weather";
import { searchLocation } from "../Services/ServiceWeather";
import { WeatherSummary } from "./WeatherSummary";

const App: FC = () => {
  const [locations, setLocations] = useState<WeatherLocations[]>([]);
  const [
    currentLocation,
    setCurrentLocation,
  ] = useState<WeatherLocations | null>(null);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  const resetAlerts = () => {
    setError("");
    setWarning("");
  };

  const addLocation = async (term: string) => {
    resetAlerts();
    const location = await searchLocation(term);

    if (!location) {
      setError(`No location found called '${term}'`);
    } else if (locations.find((item) => item.id === location.id)) {
      setWarning(`Location '${term}' is already in the list.`);
    } else {
      setLocations([location, ...locations]);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>

      <LocationSearch onSearch={addLocation} />
      {error ? <div className={`alert error`}>{error}</div> : null}

      {warning ? <div className={`alert warning`}>{warning}</div> : null}

      <LocationTable
        locations={locations}
        current={currentLocation}
        onSelect={(location) => setCurrentLocation(location)}
      />

      <WeatherSummary location={currentLocation} />
    </div>
  );
};

export default App;
