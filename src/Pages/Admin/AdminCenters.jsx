import React, { useState, useEffect } from "react";
import { getAllCenters, getCenterById, createCenter, updateCenter, deleteCenter } from "../../api/centersApi";
import "./AdminCenters.css";

export default function AdminCenters() {
  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCenters = async () => {
    try {
      setLoading(true);
      const basicCenters = await getAllCenters();
      
      const fullCenters = await Promise.all(
        basicCenters.map(async (center) => {
          try {
            return await getCenterById(center.id);
          } catch (err) {
            console.error(`Failed to fetch details for center ${center.id}:`, err);
            return center; 
          }
        })
      );
      
      setCenters(fullCenters);
      if (fullCenters.length > 0 && !selectedCenter) {
        setSelectedCenter(fullCenters[0]);
        setName(fullCenters[0].name);
        setAddress(fullCenters[0].address || "");
        setLatitude(fullCenters[0].latitude?.toString() || "");
        setLongitude(fullCenters[0].longitude?.toString() || "");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, []);

  const handleSelect = (center) => {
    setSelectedCenter(center);
    setName(center.name);
    setAddress(center.address || "");
    setLatitude(center.latitude?.toString() || "");
    setLongitude(center.longitude?.toString() || "");
    setError("");
  };

  const handleSubmit = async () => {
    if (!selectedCenter) return;

    try {
      setLoading(true);
      setError("");

      const centerData = { 
        name, 
        address, 
        latitude: parseFloat(latitude) || 0, 
        longitude: parseFloat(longitude) || 0 
      };

      if (selectedCenter.id) {
        await updateCenter(selectedCenter.id, centerData);
      } else {
        await createCenter(centerData);
      }

      await fetchCenters(); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    const newCenter = { name: "", address: "", latitude: "", longitude: "" };
    setSelectedCenter(newCenter);
    setName("");
    setAddress("");
    setLatitude("");
    setLongitude("");
    setError("");
  };

  const handleDelete = async () => {
    if (!selectedCenter || !selectedCenter.id) return;

    if (!window.confirm(`Are you sure you want to delete "${selectedCenter.name}"?`)) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      await deleteCenter(selectedCenter.id);
      await fetchCenters();
      
      if (centers.length > 1) {
        const remainingCenters = centers.filter(c => c.id !== selectedCenter.id);
        if (remainingCenters.length > 0) {
          setSelectedCenter(remainingCenters[0]);
          setName(remainingCenters[0].name);
          setAddress(remainingCenters[0].address || "");
          setLatitude(remainingCenters[0].latitude?.toString() || "");
          setLongitude(remainingCenters[0].longitude?.toString() || "");
        } else {
          setSelectedCenter(null);
          setName("");
          setAddress("");
          setLatitude("");
          setLongitude("");
        }
      } else {
        setSelectedCenter(null);
        setName("");
        setAddress("");
        setLatitude("");
        setLongitude("");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adminservices-container">
      <div className="adminservices-left">
        {centers.map((center) => (
          <button
            key={center.id}
            className={`adminservices-item ${
              selectedCenter?.id === center.id ? "active" : ""
            }`}
            onClick={() => handleSelect(center)}
            disabled={loading}
          >
            <span className="adminservices-icon">≡</span>
            <div className="adminservices-center-info">
              <div className="adminservices-center-name">{center.name}</div>
              <div className="adminservices-center-address">
                {center.address || "No address"}
              </div>
            </div>
          </button>
        ))}

        <button className="adminservices-add" onClick={handleAddNew} disabled={loading}>
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
              disabled={loading}
            />
          </div>

          <div className="adminservices-input-group">
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              disabled={loading}
            />
          </div>

          <div className="adminservices-input-group">
            <label>Latitude</label>
            <input
              type="number"
              step="any"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="Enter latitude"
              disabled={loading}
            />
          </div>

          <div className="adminservices-input-group">
            <label>Longitude</label>
            <input
              type="number"
              step="any"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="Enter longitude"
              disabled={loading}
            />
          </div>

          {error && <p className="auth-error" style={{color: 'red', margin: '10px 0'}}>{error}</p>}

          <button 
            className="adminservices-submit" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </div>

        <button 
          className="adminservices-delete" 
          onClick={handleDelete}
          disabled={!selectedCenter?.id || loading}
        >
          Delete detailing center
        </button>
      </div>
    </div>
  );
}