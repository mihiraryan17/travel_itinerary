import React, { useState } from "react";
import axios from "axios";
import ItineraryList from "./ItineraryList";

const SearchItinerary = () => {
  const [nights, setNights] = useState("");
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nights || nights < 1 || nights > 14) {
      setError("Please enter nights between 1-14");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`/api/recommendations?nights=${nights}`);

      if (response.status === 200 && response.data.length === 0) {
        setError(`No recommendations found for ${nights} nights`);
        setItineraries([]);
      } else {
        setItineraries(response.data);
        setError(null);
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Error fetching recommendations");
      setItineraries([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <label htmlFor="nights">Enter Number of Nights:</label>
          <input
            type="number"
            id="nights"
            value={nights}
            onChange={(e) => setNights(e.target.value)}
            min="1"
            max="14"
            required
            placeholder="e.g., 4"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Find Recommendations"}
          </button>
        </div>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading recommendations...</div>
      ) : itineraries.length > 0 ? (
        <ItineraryList itineraries={itineraries} />
      ) : (
        !loading && (
          <div className="no-results">
            No recommendations found for {nights} nights
          </div>
        )
      )}
    </div>
  );
};

export default SearchItinerary;
