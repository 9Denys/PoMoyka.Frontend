import React from "react";
import "./Request.css";

export default function Request() {
  const requests = [
    {
      id: 1,
      name: "Tim Kadilak",
      message:
        "The ventilation in the polishing area is poor, and it gets very stuffy during the day.",
      time: "11:32",
    },
    {
      id: 2,
      name: "Jon Freak",
      message:
        "We don’t have enough protective gloves and masks for all shifts.",
      time: "11:32",
    },
    {
      id: 3,
      name: "Tom Kruz",
      message:
        "The cleaning chemicals have a strong smell, and sometimes I feel dizzy after using them.",
      time: "11:32",
    },
  ];

  return (
    <div className="admin-request">
      <h2 className="request-title">Request</h2>

      <div className="request-table">
        <div className="request-header">
          <span className="col-name">Name</span>
          <span className="col-message">Message</span>
          <span className="col-time">Time</span>
        </div>

        {requests.map((req) => (
          <div key={req.id} className="request-row">
            <span className="col-name">{req.name}</span>
            <span className="col-message">{req.message}</span>
            <span className="col-time">{req.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
