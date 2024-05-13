import React from "react";

const FlightDetails = ({ flights }) => {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  return (
    <div>
      <table className="table w-full border-collapse">
        <thead>
          <tr className="bg-gray-400 border text-center">
            <th className="text-left">Flight</th>
            <th className="text-left">Aircraft</th>
            <th className="text-left">Class</th>
            <th className="text-left">Fare</th>
            <th className="text-left">Route</th>
            <th className="text-left">Departure</th>
            <th className="text-left">Arrival</th>
            <th className="text-left">Duration</th>
            <th className="text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => {
            const {
              itineraries: [{ segments, duration }],
              class: [flightClass],
              fareBasis: [fareBasis],
              price,
            } = flight;
            const len = segments.length;
            if (len !== flightClass.length || len !== fareBasis.length) {
              console.log("flight: ", JSON.stringify(flight));
              throw new Error(
                `Segments length: ${segments.length}, FlightClass length: ${flightClass.length}, FareBasis length: ${fareBasis.length}`,
              );
            }
            let rows = [];
            for (let i = 0; i < len; i++) {
              rows.push(
                <tr
                  key={`${index}-${i}`}
                  className={`${
                    hoveredIndex === index ? "bg-gray-200" : index % 2 !== 0 ? "bg-gray-100" : "bg-white"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <td>
                    {`${segments[i].marketingCarrier} ${segments[i].aircraft}`}
                  </td>
                  <td>{segments[i].flightNumber}</td>
                  <td>{flightClass[i]}</td>
                  <td>{fareBasis[i]}</td>
                  <td>{`${segments[i].departure.iataCode} - ${segments[i].arrival.iataCode}`}</td>
                  <td>{segments[i].departure.at}</td>
                  <td>{segments[i].arrival.at}</td>
                  {i === 0 && (
                    <>
                      <td rowSpan={len}>{duration}</td>
                      <td rowSpan={len}>{price}</td>
                    </>
                  )}
                </tr>
              );
              if (i === len - 1) {
                rows.push(
                  <tr key={`${index}-${i}-dash`}>
                    <td
                      colSpan="9"
                      style={{ borderBottom: "2px solid red", padding: "0" }}
                    ></td>
                  </tr>
                );
              }
            }
            return rows;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FlightDetails;