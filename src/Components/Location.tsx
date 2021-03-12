import React, { FC } from "react";
import { WeatherLocations } from "../Model/Weather";

// type LocationProps = {
// locations: WeatherLocations[]
// }

interface LocationProps {
  locations: WeatherLocations[];
  current: WeatherLocations | null;
  onSelect: (location: WeatherLocations) => void;
}

export const LocationTable: FC<LocationProps> = ({
  locations,
  current,
  onSelect,
}) => {
  return (
    <div>
      <h2>Locations</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr
              key={location.id}
              className={current?.id === location.id ? "table-primary" : ""}
              onClick={() => onSelect(location)}
            >
              <td>{location.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
