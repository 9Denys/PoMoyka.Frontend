import React, { useEffect, useState } from "react";
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllCenters
} from "../../api/employeeApi";

import "./Employers.css";

export default function Employers() {
  const [list, setList] = useState([]);
  const [centers, setCenters] = useState([]);
  const [selected, setSelected] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [centerId, setCenterId] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await getAllEmployees();
      setList(data);

      if (data.length > 0 && !selected) {
        selectEmployee(data[0]);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const loadCenters = async () => {
    try {
      const centersData = await getAllCenters();
      setCenters(centersData);
    } catch (e) {
      console.error("Failed to load centers:", e);
    }
  };

  useEffect(() => {
    loadEmployees();
    loadCenters();
  }, []);

  const selectEmployee = (emp) => {
    setSelected(emp);
    setFirstName(emp.firstName || "");
    setLastName(emp.lastName || "");
    setEmail(emp.email || "");
    setCenterId(emp.centerId || "");
    setPassword("");
    setError("");
  };

  const handleAddNew = () => {
    setSelected(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setCenterId("");
    setError("");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      // Валидация
      if (!firstName || !lastName || !email || !centerId) {
        setError("Please fill all required fields");
        return;
      }

      // Для создания сотрудника пароль обязателен
      if (!selected?.id && !password) {
        setError("Password is required for new employee");
        return;
      }

      const payload = {
        firstName,
        lastName,
        email,
        centerId
      };

      // Добавляем пароль только если он указан (для создания или изменения)
      if (password) {
        payload.password = password;
      }

      if (selected?.id) {
        // Update
        await updateEmployee(selected.id, payload);
      } else {
        // Create
        await createEmployee(payload);
      }

      await loadEmployees();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selected?.id) return;

    const ok = window.confirm(`Delete employee ${selected.firstName} ${selected.lastName}?`);
    if (!ok) return;

    try {
      setLoading(true);
      await deleteEmployee(selected.id);
      await loadEmployees();

      // Сбрасываем форму после удаления
      if (list.length > 1) {
        const remainingEmployees = list.filter(emp => emp.id !== selected.id);
        if (remainingEmployees.length > 0) {
          selectEmployee(remainingEmployees[0]);
        } else {
          handleAddNew();
        }
      } else {
        handleAddNew();
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adminservices-container">
      <div className="adminservices-left">
        {list.map(emp => (
          <button
            key={emp.id}
            className={`adminservices-item ${selected?.id === emp.id ? "active" : ""}`}
            onClick={() => selectEmployee(emp)}
            disabled={loading}
          >
            <span className="adminservices-icon">👤</span>
            {emp.firstName} {emp.lastName}
          </button>
        ))}

        <button className="adminservices-add" onClick={handleAddNew} disabled={loading}>
          <span className="adminservices-add-icon">＋</span> Add new employee
        </button>
      </div>

      <div className="adminservices-right">
        <div className="adminservices-form">
          <div className="adminservices-input-group">
            <label>First Name *</label>
            <input 
              value={firstName} 
              onChange={e => setFirstName(e.target.value)} 
              disabled={loading}
              placeholder="Enter first name"
            />
          </div>

          <div className="adminservices-input-group">
            <label>Last Name *</label>
            <input 
              value={lastName} 
              onChange={e => setLastName(e.target.value)} 
              disabled={loading}
              placeholder="Enter last name"
            />
          </div>

          <div className="adminservices-input-group">
            <label>Email *</label>
            <input 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              disabled={loading}
              placeholder="Enter email"
            />
          </div>

          <div className="adminservices-input-group">
            <label>Password {!selected?.id && "*"}</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
              placeholder={selected?.id ? "Leave empty to keep old password" : "Enter password"}
            />
          </div>

          <div className="adminservices-input-group">
            <label>Center *</label>
            <select
              value={centerId}
              onChange={e => setCenterId(e.target.value)}
              disabled={loading || centers.length === 0}
            >
              <option value="">Select a center</option>
              {centers.map(center => (
                <option key={center.id} value={center.id}>
                  {center.name}
                </option>
              ))}
            </select>
            {centers.length === 0 && (
              <p className="centers-hint">
                No centers available. Please create centers first.
              </p>
            )}
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button className="adminservices-submit" onClick={handleSubmit} disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>

        <button
          className="adminservices-delete"
          onClick={handleDelete}
          disabled={!selected?.id || loading}
        >
          Delete employee
        </button>
      </div>
    </div>
  );
}