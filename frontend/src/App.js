import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

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
      <h1>Travel Itinerary Planner</h1>
      {itineraries.length > 0 ? (
        <div className="itinerary-list">
          {itineraries.map((itinerary) => (
            <div key={itinerary.id} className="itinerary-card">
              <h2>{itinerary.name}</h2>
              <p>Duration: {itinerary.nights} Nights</p>
              <p>
                Created: {new Date(itinerary.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading itineraries...</p>
      )}
    </div>
  );
}

export default App;
