import React from "react";

const ItineraryList = ({ itineraries }) => {
  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const calculateDayDate = (startDate, dayNumber) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayNumber - 1);
    return formatDate(date);
  };

  return (
    <div className="itinerary-container">
      {itineraries.map((itinerary) => (
        <div key={itinerary.id} className="itinerary-card">
          <div className="itinerary-header">
            <h2>{itinerary.name}</h2>
            <div className="itinerary-meta">
              <span>
                📅 {formatDate(itinerary.start_date)} -{" "}
                {formatDate(itinerary.end_date)}
              </span>
              <span>🌙 {itinerary.nights} Nights</span>
              {itinerary.is_recommended && (
                <span className="recommended-badge">🌟 Recommended</span>
              )}
            </div>
          </div>

          <div className="day-plans">
            {itinerary.days.map((day) => (
              <div key={day.day_number} className="day-card">
                <div className="day-header">
                  <h3>Day {day.day_number}</h3>
                  <span className="day-date">
                    {calculateDayDate(itinerary.start_date, day.day_number)}
                  </span>
                </div>
                <p className="day-description">{day.description}</p>

                <div className="details-grid">
                  {day.hotel && (
                    <div className="detail-card hotel">
                      <h4>🏨 Accommodation</h4>
                      <div className="hotel-details">
                        <p>
                          <strong>{day.hotel.name}</strong>
                        </p>
                        <p>📍 {day.hotel.region.name}</p>
                        <p>⭐ {day.hotel.stars}-Star Hotel</p>
                        <p>💵 ${day.hotel.price}/night</p>
                      </div>
                    </div>
                  )}

                  {day.transfer && (
                    <div className="detail-card transfer">
                      <h4>🚌 Transfer Details</h4>
                      <div className="transfer-details">
                        <p>
                          {day.transfer.type} from{" "}
                          {day.transfer.from_region.name} to{" "}
                          {day.transfer.to_region.name}
                        </p>
                        <p>
                          ⏱️ Duration: {Math.floor(day.transfer.duration / 60)}h{" "}
                          {day.transfer.duration % 60}m
                        </p>
                        <p>💵 Cost: ${day.transfer.cost}</p>
                      </div>
                    </div>
                  )}

                  {day.activities.length > 0 && (
                    <div className="detail-card activities">
                      <h4>🎯 Activities</h4>
                      {day.activities.map((activity) => (
                        <div key={activity.id} className="activity-item">
                          <p>
                            <strong>{activity.name}</strong>
                          </p>
                          <p>⏰ {activity.duration}</p>
                          <p>📍 {activity.region.name}</p>
                          <p>💵 ${activity.cost}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {day.hotel && (
                    <div className="hotel-details">
                      <h4>🏨 {day.hotel.name}</h4>
                      <p>📍 Region: {day.hotel.region?.name}</p>
                      <p>⭐ Stars: {day.hotel.stars}</p>
                      <p>💰 Price/night: ${day.hotel.price}</p>
                    </div>
                  )}

                  {day.transfer && (
                    <div className="transfer-details">
                      <h4>🚌 Transfer: {day.transfer.type}</h4>
                      <p>From: {day.transfer.from_region?.name}</p>
                      <p>To: {day.transfer.to_region?.name}</p>
                      <p>
                        ⏱ Duration: {Math.floor(day.transfer.duration / 60)}h{" "}
                        {day.transfer.duration % 60}m
                      </p>
                      <p>💸 Cost: ${day.transfer.cost}</p>
                    </div>
                  )}

                  {day.activities?.map((activity) => (
                    <div key={activity.id} className="activity-item">
                      <h5>🎯 {activity.name}</h5>
                      <p>📍 Region: {activity.region?.name}</p>
                      <p>⏰ Duration: {activity.duration}</p>
                      <p>💵 Cost: ${activity.cost}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="price-summary">
            <h4>💰 Estimated Total Cost:</h4>
            <p>
              Hotels: $
              {itinerary.days.reduce(
                (sum, day) => sum + (day.hotel?.price || 0),
                0
              )}
            </p>
            <p>
              Transfers: $
              {itinerary.days.reduce(
                (sum, day) => sum + (day.transfer?.cost || 0),
                0
              )}
            </p>
            <p>
              Activities: $
              {itinerary.days.reduce(
                (sum, day) =>
                  sum +
                  day.activities.reduce(
                    (aSum, activity) => aSum + activity.cost,
                    0
                  ),
                0
              )}
            </p>
            <div className="total-cost">
              Total: $
              {itinerary.days.reduce((total, day) => {
                return (
                  total +
                  (day.hotel?.price || 0) +
                  (day.transfer?.cost || 0) +
                  day.activities.reduce(
                    (aSum, activity) => aSum + activity.cost,
                    0
                  )
                );
              }, 0)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryList;
