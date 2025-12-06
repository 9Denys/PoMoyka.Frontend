import React, { useEffect, useState } from "react";
import "./AdminSetPrice.css";

import {
  getCenters,
  getCenterServices,
  getAllServices,
  getAllTypeServices,
  createTypeService,
  createCenterService,
  updateCenterServicePrice,
} from "../../api/setpriceApi";

export default function AdminSetPrice() {
  const [centers, setCenters] = useState([]);
  const [selectedCenterId, setSelectedCenterId] = useState(null);

  const [centerServices, setCenterServices] = useState([]);

  const [allServices, setAllServices] = useState([]);
  const [allTypeServices, setAllTypeServices] = useState([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const carTypes = [
    { value: "hatchback", label: "Hatchback" },
    { value: "crossover", label: "CrossOver" },
    { value: "suv", label: "SUV" },
  ];

  const normalizeCarType = (raw) => {
    if (!raw) return "";
    const v = String(raw).toLowerCase();
    if (v === "hatchback" || v === "crossover" || v === "suv") return v;
    return v;
  };

  const normalizeName = (s) => (s || "").trim();

  useEffect(() => {
    const loadGlobals = async () => {
      try {
        const [services, typeServices] = await Promise.all([
          getAllServices(),
          getAllTypeServices(),
        ]);
        setAllServices(services || []);
        setAllTypeServices(typeServices || []);
        console.log("ALL SERVICES:", services);
        console.log("ALL TYPE SERVICES:", typeServices);
      } catch (err) {
        console.error(err);
        setError("Failed to load services/typeServices");
      }
    };

    loadGlobals();
  }, []);

  useEffect(() => {
    const loadCentersList = async () => {
      try {
        setLoading(true);
        setError("");

        const list = await getCenters();
        setCenters(list || []);

        if (list && list.length > 0) {
          const firstCenterId = list[0].id;
          setSelectedCenterId(firstCenterId);
          await loadCenterServices(firstCenterId);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load centers");
      } finally {
        setLoading(false);
      }
    };

    loadCentersList();
  }, []);

  const loadCenterServices = async (centerId) => {
    try {
      setLoading(true);
      setError("");
      setInfo("");

      const list = await getCenterServices(centerId);
      console.log("CENTER SERVICES RAW (GetAll):", list);

      const mapped = (list || []).map((srv) => {
        const srvNameNorm = normalizeName(srv.serviceName);

        const sObj =
          (allServices || []).find(
            (s) => normalizeName(s.name) === srvNameNorm
          ) || null;

        return {
          centerServiceId: srv.id,
          serviceId: sObj ? sObj.id : null,
          serviceName: srvNameNorm, 
          carType: normalizeCarType(srv.carType),
          price: srv.price ?? "",
        };
      });

      console.log(
        "MAPPED CENTER SERVICES (GetAll, len):",
        mapped.length,
        mapped
      );
      setCenterServices(mapped);
    } catch (err) {
      console.error(err);
      setError("Failed to load center services");
    } finally {
      setLoading(false);
    }
  };

  const findServiceByName = (name) => {
    const norm = normalizeName(name);
    if (!norm) return null;
    return (
      (allServices || []).find(
        (s) => normalizeName(s.name) === norm
      ) || null
    );
  };

  const ensureTypeService = async (serviceId, carType, serviceNameForMsg) => {
    if (!serviceId || !carType) return null;

    const normType = normalizeCarType(carType);

    let existing =
      (allTypeServices || []).find(
        (t) =>
          t.serviceId === serviceId &&
          normalizeCarType(t.carType) === normType
      ) || null;

    if (existing) {
      console.log("Found existing TypeService:", existing);
      return existing.id;
    }

    try {
      console.log("Creating TypeService:", {
        serviceId,
        carType: normType,
      });

      await createTypeService({
        serviceId,
        carType: normType,
      });

      const refreshed = await getAllTypeServices();
      setAllTypeServices(refreshed || []);

      const created =
        (refreshed || []).find(
          (t) =>
            t.serviceId === serviceId &&
            normalizeCarType(t.carType) === normType
        ) || null;

      if (created) {
        console.log("Found/created TypeService:", created);
        return created.id;
      }

      setError(
        `Не удалось найти TypeService для "${serviceNameForMsg}" и "${normType}" после создания.`
      );
      return null;
    } catch (err) {
      console.error("Failed to create TypeService", err);
      setError(
        `Ошибка при создании TypeService для "${serviceNameForMsg}" и "${normType}".`
      );
      return null;
    }
  };

  const updateField = (index, field, value) => {
    setCenterServices((prev) => {
      const updated = [...prev];
      const item = { ...updated[index] };

      if (field === "serviceName") {
        item.serviceName = value;
        const s = findServiceByName(value);
        item.serviceId = s ? s.id : null;
      } else if (field === "carType") {
        item.carType = value;
      } else if (field === "price") {
        item.price = value;
      } else {
        item[field] = value;
      }

      updated[index] = item;
      return updated;
    });
  };

  const handleSave = async () => {
    if (!selectedCenterId) return;

    setSaving(true);
    setError("");
    setInfo("");

    try {
      for (const item of centerServices) {
        if (!item.price) continue;

        if (item.centerServiceId) {
          console.log("Updating CenterService price:", {
            centerServiceId: item.centerServiceId,
            price: Number(item.price),
          });

          await updateCenterServicePrice(
            item.centerServiceId,
            Number(item.price)
          );
          continue;
        }

        if (!item.serviceId || !item.carType) {
          console.warn("Skip row: serviceId or carType is empty", item);
          continue;
        }

        const typeServiceId = await ensureTypeService(
          item.serviceId,
          item.carType,
          item.serviceName
        );

        if (!typeServiceId) {
          console.warn("Cannot get typeServiceId for row", item);
          continue;
        }

        const body = {
          price: Number(item.price),
          centerId: selectedCenterId,
          typeServiceId,
        };

        console.log("Creating CenterService with body:", body);

        const createdCS = await createCenterService(body);
        console.log("Created CenterService response:", createdCS);
      }

      setInfo("Prices saved successfully!");
      await loadCenterServices(selectedCenterId);
    } catch (err) {
      console.error(err);
      setError("Failed to save prices");
    } finally {
      setSaving(false);
    }
  };

  const addNewRow = () => {
    setCenterServices((prev) => [
      ...prev,
      {
        centerServiceId: null,
        serviceId: null,
        serviceName: "",
        carType: "",
        price: "",
      },
    ]);
  };

  return (
    <div className="adminservices-container">
      <div className="adminservices-left">
        <h3 className="adminservices-title">Centers</h3>

        {loading && centers.length === 0 && (
          <p className="adminservices-info">Loading centers...</p>
        )}

        {centers.map((center) => (
          <button
            key={center.id}
            className={
              "adminservices-item" +
              (selectedCenterId === center.id ? " active" : "")
            }
            onClick={() => {
              setSelectedCenterId(center.id);
              loadCenterServices(center.id);
            }}
          >
            <span className="adminservices-icon">🏢</span>
            <div className="adminservices-center-name">{center.name}</div>
          </button>
        ))}
      </div>

      <div className="adminservices-right">
        <div className="adminservices-header">
          <h3>Manage Center Services & Pricing</h3>
          <button className="adminservices-add-btn" onClick={addNewRow}>
            + Add Service
          </button>
        </div>

        {error && <p className="adminservices-error">{error}</p>}
        {info && <p className="adminservices-info">{info}</p>}

        <div className="adminservices-table">
          <div className="adminservices-row adminservices-row-header">
            <div className="adminservices-cell header">Service</div>
            <div className="adminservices-cell header">Car Type</div>
            <div className="adminservices-cell header">Price</div>
          </div>

          {centerServices.map((srv, index) => (
            <div key={index} className="adminservices-row">
              <select
                className="adminservices-cell"
                value={srv.serviceName}
                onChange={(e) =>
                  updateField(index, "serviceName", e.target.value)
                }
              >
                <option value="">Select service</option>
                {allServices.map((s) => {
                  const normName = normalizeName(s.name);
                  return (
                    <option key={s.id} value={normName}>
                      {s.name}
                    </option>
                  );
                })}
              </select>

              <select
                className="adminservices-cell"
                value={srv.carType}
                onChange={(e) =>
                  updateField(index, "carType", e.target.value)
                }
              >
                <option value="">Select car type</option>
                {carTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>

              <input
                className="adminservices-cell"
                type="number"
                value={srv.price}
                onChange={(e) => updateField(index, "price", e.target.value)}
                placeholder="0"
                min="0"
              />
            </div>
          ))}
        </div>

        <button
          className="adminservices-save"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
