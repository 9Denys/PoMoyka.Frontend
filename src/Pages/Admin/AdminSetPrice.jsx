import React, { useState } from "react";
import "./AdminSetPrice.css";

export default function AdminSetPrice() {
  const [selectedCenter, setSelectedCenter] = useState("Pomoyka 1");

  const centers = [
    { name: "Pomoyka 1", address: "13A Gvardeyskaya Street" },
    { name: "Pomoyka 2", address: "13A Gvardeyskaya Street" },
    { name: "Pomoyka 3", address: "13A Gvardeyskaya Street" },
    { name: "Pomoyka 4", address: "13A Gvardeyskaya Street" },
  ];

  const [services, setServices] = useState([
    { name: "", suv: "", sedan: "", hatchback: "" },
    { name: "", suv: "", sedan: "", hatchback: "" },
    { name: "", suv: "", sedan: "", hatchback: "" },
  ]);

  const handleInputChange = (index, field, value) => {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
  };

  const handleAddService = () => {
    setServices([...services, { name: "", suv: "", sedan: "", hatchback: "" }]);
  };

  const handleSave = () => {
    console.log("Saved prices:", { center: selectedCenter, services });
  };

  return (
    <div className="adminservices-container">
      <div className="adminservices-left">
        {centers.map((center) => (
          <button
            key={center.name}
            className={`adminservices-item ${
              selectedCenter === center.name ? "active" : ""
            }`}
            onClick={() => setSelectedCenter(center.name)}
          >
            <span className="adminservices-icon">≡</span>
            <div className="adminservices-center-info">
              <div className="adminservices-center-name">{center.name}</div>
              <div className="adminservices-center-address">
                {center.address}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="adminservices-right">
        <div className="adminservices-header">
          <h3>Manage Services</h3>
          <button
            className="adminservices-addservice"
            onClick={handleAddService}
          >
            ＋
          </button>
        </div>

        <div className="adminservices-table">
          <div className="adminservices-row adminservices-row-header">
            <div className="adminservices-cell header">Service</div>
            <div className="adminservices-cell header">SUV</div>
            <div className="adminservices-cell header">Sedan</div>
            <div className="adminservices-cell header">Hatchback</div>
          </div>

          {services.map((service, index) => (
            <div className="adminservices-row" key={index}>
              <input
                type="text"
                className="adminservices-cell"
                placeholder="Service name"
                value={service.name}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
              />
              <input
                type="text"
                className="adminservices-cell"
                placeholder="SUV price"
                value={service.suv}
                onChange={(e) =>
                  handleInputChange(index, "suv", e.target.value)
                }
              />
              <input
                type="text"
                className="adminservices-cell"
                placeholder="Sedan price"
                value={service.sedan}
                onChange={(e) =>
                  handleInputChange(index, "sedan", e.target.value)
                }
              />
              <input
                type="text"
                className="adminservices-cell"
                placeholder="Hatchback price"
                value={service.hatchback}
                onChange={(e) =>
                  handleInputChange(index, "hatchback", e.target.value)
                }
              />
            </div>
          ))}
        </div>

        <button className="adminservices-save" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}
