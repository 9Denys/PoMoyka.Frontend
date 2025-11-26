import React, { useState, useEffect } from "react";
import "./AdminServices.css";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE_URL = 'https://pomoyka-backend.onrender.com';
  const accessToken = localStorage.getItem('accessToken');

  // Получение всех сервисов
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/Service/GetAll`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }

      const data = await response.json();
      setServices(data);
      if (data.length > 0 && !selectedService) {
        setSelectedService(data[0]);
        setName(data[0].name);
        setDescription(data[0].description);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSelect = (service) => {
    setSelectedService(service);
    setName(service.name);
    setDescription(service.description);
    setError("");
  };

  const handleSubmit = async () => {
    if (!selectedService) return;

    try {
      setLoading(true);
      setError("");

      if (selectedService.id) {
        // Обновление существующего сервиса
        const response = await fetch(`${API_BASE_URL}/api/Service/Update/${selectedService.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, description }),
        });

        if (!response.ok) {
          throw new Error('Failed to update service');
        }

        await fetchServices(); // Обновляем список
      } else {
        // Создание нового сервиса
        const response = await fetch(`${API_BASE_URL}/api/Service/Create`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, description }),
        });

        if (!response.ok) {
          throw new Error('Failed to create service');
        }

        await fetchServices(); // Обновляем список
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    const newService = { name: "", description: "" };
    setSelectedService(newService);
    setName("");
    setDescription("");
    setError("");
  };

  const handleDelete = async () => {
    if (!selectedService || !selectedService.id) return;

    if (!window.confirm(`Are you sure you want to delete "${selectedService.name}"?`)) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_BASE_URL}/api/Service/Delete/${selectedService.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete service');
      }

      // После удаления выбираем первый доступный сервис или сбрасываем форму
      await fetchServices();
      if (services.length > 1) {
        const remainingServices = services.filter(s => s.id !== selectedService.id);
        setSelectedService(remainingServices[0]);
        setName(remainingServices[0].name);
        setDescription(remainingServices[0].description);
      } else {
        setSelectedService(null);
        setName("");
        setDescription("");
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
        {services.map((service) => (
          <button
            key={service.id}
            className={`adminservices-item ${
              selectedService?.id === service.id ? "active" : ""
            }`}
            onClick={() => handleSelect(service)}
          >
            <span className="adminservices-icon">≡</span>
            {service.name}
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
          disabled={!selectedService?.id || loading}
        >
          Delete services
        </button>
      </div>
    </div>
  );
}