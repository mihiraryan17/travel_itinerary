import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import SearchItinerary from "./components/SearchItinerary.jsx";
import "./components/SearchItinerary.css";

function App() {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/itineraries");
        setItineraries(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Thailand Travel Planner</h1>
      <SearchItinerary />
    </div>
  );
}

export default App;
