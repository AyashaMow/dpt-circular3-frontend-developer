import React, { useState } from "react";
import FlightFilter from "./FlightFilter";
import FlightDetails from "./FlightDetails";
import data from "./flights.json";
import _ from 'underscore'

const App = () => {
  const flights = data['flightOffer'];
  const [filterCriteria, setFilterCriteria] = useState({
    startLocation: "",
    endLocation: "",
    startDate: null,
    endDate: null,
    flightClass: "",
  });

  const handleFilterChange = (filterKey, value) => {
    setFilterCriteria({ ...filterCriteria, [filterKey]: value });
  };

  const filteredFlights = _.filter(flights, flight => {
    let ret = true;
  
    if (filterCriteria.startLocation !== "") {
      const startLocation = filterCriteria.startLocation.toLowerCase();
      if (!flight.itineraries.some(itinerary =>
        itinerary.segments.some(segment =>
          segment.departure.iataCode.toLowerCase().includes(startLocation)
        )
      )) ret = false;
    }
  
    if (filterCriteria.endLocation !== "") {
      const endLocation = filterCriteria.endLocation.toLowerCase();
      if (!flight.itineraries.some(itinerary =>
        itinerary.segments.some(segment =>
          segment.arrival.iataCode.toLowerCase().includes(endLocation)
        )
      )) ret = false;
    }
  
    if (filterCriteria.flightClass !== "") {
      const flightClass = filterCriteria.flightClass.toLowerCase();
      if (!flight.itineraries.some(itinerary =>
        itinerary.segments.some(segment =>
          segment.cabin.toLowerCase().includes(flightClass)
        )
      )) ret = false;
    }
  
    if (filterCriteria.startDate) {
      const startDate = filterCriteria.startDate.getTime();
      if (!flight.itineraries.some(itinerary => {
        const segment = itinerary.segments[0];
        const departureDateTime = new Date(segment.departure.at).getTime();
        return departureDateTime >= startDate && departureDateTime < startDate + (24 * 60 * 60 * 1000);
      })) ret = false;
    }
    if (filterCriteria.endDate) {
      const endDate = filterCriteria.endDate.getTime();
      if (!flight.itineraries.some(itinerary => {
        const segment = itinerary.segments[itinerary.segments.length - 1];
        const arrivalDateTime = new Date(segment.arrival.at).getTime();
        return arrivalDateTime >= endDate && arrivalDateTime < endDate + (24 * 60 * 60 * 1000);
      })) ret = false;
    }
  
    return ret;
  });

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div>
        <FlightFilter
          startLocation={filterCriteria.startLocation}
          endLocation={filterCriteria.endLocation}
          startDate={filterCriteria.startDate} 
          endDate={filterCriteria.endDate} 
          flightClass={filterCriteria.flightClass}
          onFilterChange={handleFilterChange}
        />
        <FlightDetails flights={filteredFlights} />
      </div>
    </div>
  );
};

export default App;