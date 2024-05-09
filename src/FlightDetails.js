import React from "react";
import './FlightDetails.css'; 

const FlightDetails = ({ flights }) => {
  flights = flights.flightOffer;
  return (
    <div>
      <h2>Flight Details</h2>
      <table>
        <thead>
          <tr>
            <th>Flight</th>
            <th>Aircraft</th>
            <th>Class</th>
            <th>Fare</th>
            <th>Route</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Duration</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={index}>
              <td>
                {flight.itineraries[0].segments[0].marketingCarrier}
                {flight.itineraries[0].segments[0].flightNumber}
              </td>
              <td>{flight.itineraries[0].segments[0].aircraft}</td>
              <td>{flight.class[0][0]}</td>
              <td>{flight.fareBasis[0][0]}</td>
              <td>{`${flight.itineraries[0].segments[0].departure.iataCode} - ${flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.iataCode}`}</td>
              <td>
                {new Date(
                  flight.itineraries[0].segments[0].departure.at,
                ).toLocaleString("en-US", { timeZoneName: "short" })}
              </td>
              <td>
                {new Date(
                  flight.itineraries[0].segments[
                    flight.itineraries[0].segments.length - 1
                  ].arrival.at,
                ).toLocaleString("en-US", { timeZoneName: "short" })}
              </td>
              <td>{flight.itineraries[0].duration}</td>
              <td>${flight.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightDetails;
