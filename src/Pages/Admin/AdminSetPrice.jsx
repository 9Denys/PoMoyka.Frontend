import React, { useState, useEffect, useCallback } from "react";
import "./AdminSetPrice.css";
import { getAllCenters, getCenterById } from "../../api/centersApi"; // путь к твоему API файлу
import { getAllServices, createService, updateService, deleteService } from "../../api/serviceApi"; // путь к твоему API файлу

// API для CenterServices (добавь в свой файл services.js если нет)
const API_BASE_URL = 'https://pomoyka-backend.onrender.com';

async function getCenterServices(centerId) {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(`${API_BASE_URL}/api/Centers/GetById/${centerId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch center services');
  }

  const data = await response.json();
  return data.services || [];
}

async function createCenterService(centerServiceData) {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(`${API_BASE_URL}/api/CentersServices/Create`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(centerServiceData),
  });

  if (!response.ok) {
    throw new Error('Failed to create center service');
  }

  return await response.json();
}

async function updateCenterService(id, centerServiceData) {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(`${API_BASE_URL}/api/CentersServices/Update/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(centerServiceData),
  });

  if (!response.ok) {
    throw new Error('Failed to update center service');
  }

  return await response.json();
}

async function deleteCenterService(id) {
  const accessToken = localStorage.getItem('accessToken');
  const response = await fetch(`${API_BASE_URL}/api/CentersServices/Delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete center service');
  }

  return response;
}

export default function AdminSetPrice() {
  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [services, setServices] = useState([]);
  const [centerServices, setCenterServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загружаем центры при монтировании
  useEffect(() => {
    loadCenters();
  }, []);

  // Загружаем сервисы при монтировании
  useEffect(() => {
    loadServices();
  }, []);

  // Загружаем сервисы центра при выборе центра
  useEffect(() => {
    if (selectedCenter) {
      loadCenterServices(selectedCenter.id);
    }
  }, [selectedCenter]);

  const loadCenters = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllCenters();
      setCenters(data);
      if (data.length > 0 && !selectedCenter) {
        setSelectedCenter(data[0]);
      }
    } catch (err) {
      setError(`Ошибка загрузки центров: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadServices = async () => {
    try {
      const data = await getAllServices();
      setServices(data);
    } catch (err) {
      console.error("Ошибка загрузки сервисов:", err);
    }
  };

  const loadCenterServices = async (centerId) => {
    try {
      setLoading(true);
      const data = await getCenterServices(centerId);
      
      // Группируем сервисы по имени для отображения в таблице
      const groupedServices = groupServicesByServiceName(data);
      setCenterServices(groupedServices);
    } catch (err) {
      setError(`Ошибка загрузки сервисов центра: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Группируем сервисы по названию
  const groupServicesByServiceName = (servicesArray) => {
    const grouped = {};
    
    servicesArray.forEach(service => {
      if (!grouped[service.serviceName]) {
        grouped[service.serviceName] = {
          name: service.serviceName,
          suv: "",
          sedan: "",
          hatchback: ""
        };
      }
      
      // Заполняем цену для соответствующего типа машины
      if (service.carType.toLowerCase() === 'suv') {
        grouped[service.serviceName].suv = service.price;
      } else if (service.carType.toLowerCase() === 'sedan') {
        grouped[service.serviceName].sedan = service.price;
      } else if (service.carType.toLowerCase() === 'hatchback') {
        grouped[service.serviceName].hatchback = service.price;
      }
    });
    
    return Object.values(grouped);
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...centerServices];
    updated[index][field] = value;
    setCenterServices(updated);
  };

  const handleAddService = () => {
    setCenterServices([
      ...centerServices,
      { name: "", suv: "", sedan: "", hatchback: "" }
    ]);
  };

  const handleSave = async () => {
    if (!selectedCenter) {
      setError("Выберите центр");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Для каждого сервиса в таблице
      for (const service of centerServices) {
        // Ищем существующий сервис по имени
        const existingService = services.find(s => s.name === service.name);
        
        if (!existingService && service.name) {
          // Создаем новый сервис если его нет
          const newService = await createService({
            name: service.name,
            description: ""
          });
          
          // Добавляем созданный сервис в список сервисов
          setServices(prev => [...prev, newService]);
        }

        // Обновляем/создаем цены для каждого типа автомобиля
        const serviceId = existingService?.id || 
          (services.find(s => s.name === service.name)?.id);

        if (serviceId) {
          await updateCenterServiceForCarType(serviceId, service);
        }
      }

      // Перезагружаем сервисы центра
      await loadCenterServices(selectedCenter.id);
      
      console.log("Prices saved successfully!");
    } catch (err) {
      setError(`Ошибка сохранения: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateCenterServiceForCarType = async (serviceId, serviceData) => {
    const centerId = selectedCenter.id;
    
    // Для каждого типа автомобиля
    const carTypes = [
      { type: 'suv', value: serviceData.suv },
      { type: 'sedan', value: serviceData.sedan },
      { type: 'hatchback', value: serviceData.hatchback }
    ];

    for (const carType of carTypes) {
      if (carType.value) {
        try {
          // Здесь нужно проверить, существует ли уже такая запись
          // и обновить ее или создать новую
          // Пока что создаем новую запись
          await createCenterService({
            centerId: centerId,
            serviceId: serviceId,
            carType: carType.type,
            price: parseFloat(carType.value)
          });
        } catch (err) {
          console.error(`Error saving ${carType.type}:`, err);
        }
      }
    }
  };

  if (loading && centers.length === 0) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error && centers.length === 0) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="adminservices-container">
      <div className="adminservices-left">
        {centers.map((center) => (
          <button
            key={center.id}
            className={`adminservices-item ${
              selectedCenter?.id === center.id ? "active" : ""
            }`}
            onClick={() => setSelectedCenter(center)}
          >
            <span className="adminservices-icon">≡</span>
            <div className="adminservices-center-info">
              <div className="adminservices-center-name">{center.name}</div>
              <div className="adminservices-center-address">
                {center.address || "Адрес не указан"}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="adminservices-right">
        {selectedCenter && (
          <>
            <div className="adminservices-header">
              <h3>Управление сервисами: {selectedCenter.name}</h3>
              <button
                className="adminservices-addservice"
                onClick={handleAddService}
                disabled={loading}
              >
                ＋
              </button>
            </div>

            {error && <div className="error-message">{error}</div>}
            {loading && <div className="loading">Загрузка...</div>}

            <div className="adminservices-table">
              <div className="adminservices-row adminservices-row-header">
                <div className="adminservices-cell header">Service</div>
                <div className="adminservices-cell header">SUV</div>
                <div className="adminservices-cell header">Sedan</div>
                <div className="adminservices-cell header">Hatchback</div>
              </div>

              {centerServices.map((service, index) => (
                <div className="adminservices-row" key={index}>
                  <input
                    type="text"
                    className="adminservices-cell"
                    placeholder="Service name"
                    value={service.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                    disabled={loading}
                    list="services-list"
                  />
                  <datalist id="services-list">
                    {services.map(s => (
                      <option key={s.id} value={s.name} />
                    ))}
                  </datalist>
                  <input
                    type="number"
                    className="adminservices-cell"
                    placeholder="SUV price"
                    value={service.suv}
                    onChange={(e) =>
                      handleInputChange(index, "suv", e.target.value)
                    }
                    disabled={loading}
                  />
                  <input
                    type="number"
                    className="adminservices-cell"
                    placeholder="Sedan price"
                    value={service.sedan}
                    onChange={(e) =>
                      handleInputChange(index, "sedan", e.target.value)
                    }
                    disabled={loading}
                  />
                  <input
                    type="number"
                    className="adminservices-cell"
                    placeholder="Hatchback price"
                    value={service.hatchback}
                    onChange={(e) =>
                      handleInputChange(index, "hatchback", e.target.value)
                    }
                    disabled={loading}
                  />
                </div>
              ))}
            </div>

            <button 
              className="adminservices-save" 
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Сохранение..." : "Сохранить"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}