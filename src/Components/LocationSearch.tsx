import React, { useState, FC } from "react";

interface LocationSearchProps {
  onSearch: (search: string) => void;
}

export const LocationSearch: FC<LocationSearchProps> = ({ onSearch }) => {
  const [locationSearch, setLocationSearch] = useState("lagos");

  const disableSearch = locationSearch.trim() === "";
  const addLocation = () => {
    onSearch(locationSearch);
    setLocationSearch("");
  };

  return (
    <div>
      <label htmlFor="labeltag">Add Location</label>
      <input
        id="labeltag"
        className="ml-1 mr-1"
        type="text"
        value={locationSearch}
        onChange={(e) => setLocationSearch(e.target.value)}
      />
      <button
        className="btn btn-primary"
        onClick={addLocation}
        disabled={disableSearch}
      >
        Search
      </button>
    </div>
  );
};
