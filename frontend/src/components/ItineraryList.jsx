import React from "react";
import "./ItineraryList.css";

const ItineraryList = ({ itineraries }) => {
  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div className="itinerary-container">
      {itineraries.length > 0 ? (
        itineraries.map((itinerary) => (
          <div key={itinerary.id} className="itinerary-card">
            <div className="header">
              <h2>{itinerary.name}</h2>
              <div className="metadata">
                <p>
                  📅 {formatDate(itinerary.start_date)} -{" "}
                  {formatDate(itinerary.end_date)}
                </p>
                <p>🌙 {itinerary.nights} Nights</p>
                {itinerary.is_recommended && (
                  <span className="recommended-badge">🌟 Recommended</span>
                )}
              </div>
            </div>

            <div className="day-plans">
              {itinerary.days.map((day) => (
                <div key={day.day_number} className="day-card">
                  <h3>
                    Day {day.day_number}: {day.description}
                  </h3>

                  {day.hotel && (
                    <div className="hotel-details">
                      <h4>🏨 {day.hotel?.name || "Hotel not specified"}</h4>
                      <p>
                        📍 {day.hotel?.region?.name || "Region not specified"}
                      </p>
                      <p>⭐ {day.hotel?.stars || "N/A"} Stars</p>
                    </div>
                  )}

                  {day.transfer && (
                    <div className="transfer-details">
                      <h4>🚌 {day.transfer?.type || "Transfer"} Details</h4>
                      <p>
                        From: {day.transfer?.from_region?.name || "Unknown"}
                      </p>
                      <p>To: {day.transfer?.to_region?.name || "Unknown"}</p>
                    </div>
                  )}

                  {day.activities?.length > 0 && (
                    <div className="activities-list">
                      <h4>🎯 Activities:</h4>
                      {day.activities.map((activity) => (
                        <div key={activity.id} className="activity-item">
                          <p>{activity?.name || "Unnamed Activity"}</p>
                          <p>
                            ⏰ {activity?.duration || "Duration not specified"}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="no-results">
          <p>No itineraries found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default ItineraryList;
