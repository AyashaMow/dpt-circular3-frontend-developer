import FlightDetails from "./FlightDetails";
import data from "./flights.json";

function App() {
  return <FlightDetails flights={data} />;
}
export default App;
