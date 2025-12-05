import React, { useState, useEffect } from "react";
import {
  getAllCenters,
  getCenterById,
  getAllServices,
  getServiceTypes,
  createServiceType,
  updateServiceType,
  updateCenterServicePrice
} from "../../api/setpriceApi";
import "./AdminSetPrice.css";

export default function AdminSetPrice() {
  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [services, setServices] = useState([]);
  const [centerServices, setCenterServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Загрузка центров
  const loadCenters = async () => {
    try {
      setLoading(true);
      const data = await getAllCenters();
      setCenters(data);
      
      if (data.length > 0 && !selectedCenter) {
        await selectCenter(data[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка всех услуг
  const loadServices = async () => {
    try {
      const data = await getAllServices();
      setServices(data);
    } catch (err) {
      console.error("Failed to load services:", err);
    }
  };

  // Выбор центра
  const selectCenter = async (center) => {
    try {
      setLoading(true);
      setSelectedCenter(center);
      
      // Загружаем полную информацию о центре (включая услуги)
      const fullCenter = await getCenterById(center.id);
      
      // Преобразуем данные центра в формат для таблицы
      const formattedServices = await formatCenterServices(fullCenter.services || []);
      setCenterServices(formattedServices);
      
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Форматирование услуг центра для таблицы
  const formatCenterServices = async (centerServices) => {
    if (!centerServices.length) return [];

    const formatted = [];
    
    // Группируем услуги по названию
    const servicesMap = {};
    
    centerServices.forEach(cs => {
      if (!servicesMap[cs.serviceName]) {
        servicesMap[cs.serviceName] = {
          serviceName: cs.serviceName,
          types: {},
          centerServiceIds: {}
        };
      }
      servicesMap[cs.serviceName].types[cs.carType] = cs.price;
      servicesMap[cs.serviceName].centerServiceIds[cs.carType] = cs.centerServiceId;
    });

    // Преобразуем в массив
    for (const serviceName in servicesMap) {
      const service = servicesMap[serviceName];
      const serviceData = services.find(s => s.name === serviceName) || { id: null };
      
      formatted.push({
        id: serviceData.id,
        name: serviceName,
        suv: service.types.SUV || service.types.suv || "",
        sedan: service.types.Sedan || service.types.sedan || "",
        hatchback: service.types.Hatchback || service.types.hatchback || "",
        centerServiceIds: service.centerServiceIds
      });
    }

    return formatted;
  };

  // Загрузка типов автомобилей для услуги
  const loadServiceTypes = async (serviceId) => {
    try {
      const types = await getServiceTypes(serviceId);
      return types || [];
    } catch (err) {
      console.error(`Failed to load types for service ${serviceId}:`, err);
      return [];
    }
  };

  // Обработчик изменения поля
  const handleInputChange = async (index, field, value) => {
    const updated = [...centerServices];
    updated[index][field] = value;
    setCenterServices(updated);
  };

  // Добавление новой услуги
  const handleAddService = () => {
    setCenterServices([
      ...centerServices,
      { 
        id: null, 
        name: "", 
        suv: "", 
        sedan: "", 
        hatchback: "",
        centerServiceIds: {}
      }
    ]);
  };

  // Сохранение цен
  const handleSave = async () => {
    if (!selectedCenter) {
      setError("Please select a center");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Сохраняем каждую услугу
      for (const service of centerServices) {
        if (!service.name.trim()) continue;

        // Находим ID услуги по имени
        const serviceData = services.find(s => s.name === service.name);
        if (!serviceData && !service.id) {
          console.warn(`Service "${service.name}" not found`);
          continue;
        }

        const serviceId = service.id || serviceData?.id;

        // Сохраняем цены для каждого типа автомобиля
        const carTypes = [
          { type: 'SUV', price: service.suv },
          { type: 'Sedan', price: service.sedan },
          { type: 'Hatchback', price: service.hatchback }
        ];

        for (const carType of carTypes) {
          if (carType.price) {
            const centerServiceId = service.centerServiceIds?.[carType.type];
            
            if (centerServiceId) {
              // Обновляем существующую цену
              await updateCenterServicePrice(centerServiceId, { 
                price: parseFloat(carType.price) 
              });
            } else if (serviceId && selectedCenter.id) {
              // Сначала создаем связь услуга-тип автомобиля
              // TODO: Здесь нужен endpoint для создания связи центр-услуга
              // Пока просто логируем
              console.log(`Need to create: ${service.name} - ${carType.type} - ${carType.price}`);
            }
          }
        }
      }

      // Обновляем данные центра
      await selectCenter(selectedCenter);
      alert("Prices saved successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Инициализация
  useEffect(() => {
    loadCenters();
    loadServices();
  }, []);

  return (
    <div className="adminservices-container">
      <div className="adminservices-left">
        {centers.map((center) => (
          <button
            key={center.id}
            className={`adminservices-item ${
              selectedCenter?.id === center.id ? "active" : ""
            }`}
            onClick={() => selectCenter(center)}
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
      </div>

      <div className="adminservices-right">
        <div className="adminservices-header">
          <h3>Manage Services for {selectedCenter?.name || "Select Center"}</h3>
          <button
            className="adminservices-addservice"
            onClick={handleAddService}
            disabled={loading || !selectedCenter}
          >
            ＋
          </button>
        </div>

        <div className="adminservices-table">
          <div className="adminservices-row adminservices-row-header">
            <div className="adminservices-cell header">Service</div>
            <div className="adminservices-cell header">SUV ($)</div>
            <div className="adminservices-cell header">Sedan ($)</div>
            <div className="adminservices-cell header">Hatchback ($)</div>
          </div>

          {centerServices.map((service, index) => (
            <div className="adminservices-row" key={index}>
              <select
                className="adminservices-cell"
                value={service.name}
                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                disabled={loading}
              >
                <option value="">Select Service</option>
                {services.map(s => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                className="adminservices-cell"
                placeholder="SUV price"
                value={service.suv}
                onChange={(e) => handleInputChange(index, "suv", e.target.value)}
                disabled={loading}
                min="0"
                step="0.01"
              />
              <input
                type="number"
                className="adminservices-cell"
                placeholder="Sedan price"
                value={service.sedan}
                onChange={(e) => handleInputChange(index, "sedan", e.target.value)}
                disabled={loading}
                min="0"
                step="0.01"
              />
              <input
                type="number"
                className="adminservices-cell"
                placeholder="Hatchback price"
                value={service.hatchback}
                onChange={(e) => handleInputChange(index, "hatchback", e.target.value)}
                disabled={loading}
                min="0"
                step="0.01"
              />
            </div>
          ))}
          
          {centerServices.length === 0 && (
            <div className="adminservices-row">
              <div className="adminservices-cell empty-message" colSpan="4">
                {selectedCenter 
                  ? "No services configured for this center. Add a service to get started."
                  : "Select a center to manage its services."
                }
              </div>
            </div>
          )}
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button 
          className="adminservices-save" 
          onClick={handleSave}
          disabled={loading || !selectedCenter || centerServices.length === 0}
        >
          {loading ? "Saving..." : "Save Prices"}
        </button>
      </div>
    </div>
  );
}