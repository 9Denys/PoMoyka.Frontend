import React, { useState } from "react";
import "./AdminCenters.css";

export default function AdminCenters() {
  const [selectedCenter, setSelectedCenter] = useState("Pomoyka 1");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSelect = (center) => {
    setSelectedCenter(center);
    setName("");
    setAddress("");
    setLatitude("");
    setLongitude("");
  };

  const handleSubmit = () => {
    console.log("Submitted:", { name, address, latitude, longitude });
  };

  const handleAddNew = () => {
    console.log("Add new detailing center");
  };

  const handleDelete = () => {
    console.log("Delete detailing center");
  };

  const centers = [
    { name: "Pomoyka 1", address: "13A Gvardeyskaya Street" },
    { name: "Pomoyka 2", address: "13A Gvardeyskaya Street" },
    { name: "Pomoyka 3", address: "13A Gvardeyskaya Street" },
    { name: "Pomoyka 4", address: "13A Gvardeyskaya Street" },
  ];

  return (
    <div className="adminservices-container">
      <div className="adminservices-left">
        {centers.map((center) => (
          <button
            key={center.name}
            className={`adminservices-item ${
              selectedCenter === center.name ? "active" : ""
            }`}
            onClick={() => handleSelect(center.name)}
          >
            <span className="adminservices-icon">≡</span>
            <div className="adminservices-center-info">
              <div className="adminservices-center-name">{center.name}</div>
              <div className="adminservices-center-address">{center.address}</div>
            </div>
          </button>
        ))}

        <button className="adminservices-add" onClick={handleAddNew}>
          <span className="adminservices-add-icon">＋</span> Add new detailing center
        </button>
      </div>

      <div className="adminservices-right">
        <div className="adminservices-form">
          <div className="adminservices-input-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter center name"
            />
          </div>

          <div className="adminservices-input-group">
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
            />
          </div>

          <div className="adminservices-input-group">
            <label>Latitude</label>
            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="Enter latitude"
            />
          </div>

          <div className="adminservices-input-group">
            <label>Longitude</label>
            <input
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="Enter longitude"
            />
          </div>

          <button className="adminservices-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>

        <button className="adminservices-delete" onClick={handleDelete}>
          Delete detailing center
        </button>
      </div>
    </div>
  );
}
