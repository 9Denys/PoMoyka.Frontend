import React, { useState } from "react";
import "./AdminServices.css";

export default function AdminServices() {
  const [selectedService, setSelectedService] = useState("Interior Care");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSelect = (service) => {
    setSelectedService(service);
    setName("");
    setDescription("");
  };

  const handleSubmit = () => {
    console.log("Submitted:", { name, description });
  };

  const handleAddNew = () => {
    console.log("Add new service");
  };

  const handleDelete = () => {
    console.log("Delete service");
  };

  const services = [
    "Interior Care",
    "Leather Interior",
    "Exterior Care",
    "Premium Detaling",
  ];

  return (
    <div className="adminservices-container">
      <div className="adminservices-left">
        {services.map((service) => (
          <button
            key={service}
            className={`adminservices-item ${
              selectedService === service ? "active" : ""
            }`}
            onClick={() => handleSelect(service)}
          >
            <span className="adminservices-icon">≡</span>
            {service}
          </button>
        ))}
        <button className="adminservices-add" onClick={handleAddNew}>
          <span className="adminservices-add-icon">＋</span> Add new services
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
              placeholder="Enter service name"
            />
          </div>

          <div className="adminservices-input-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter service description"
            ></textarea>
          </div>

          <button className="adminservices-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>

        <button className="adminservices-delete" onClick={handleDelete}>
          Delete services
        </button>
      </div>
    </div>
  );
}
