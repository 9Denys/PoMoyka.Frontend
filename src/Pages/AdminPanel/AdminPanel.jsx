import React, { useState } from "react";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar.jsx";
import "./AdminPanel.css";

const mockData = [
  { id: 1, name: "Tim Kadilak", firstName: "Tim", lastName: "Kadilak", email: "tim@example.com", centers: "Kyiv" },
  { id: 2, name: "Hemec Durak", firstName: "Hemec", lastName: "Durak", email: "hemec@example.com", centers: "Lviv" },
  { id: 3, name: "Tom Kruz", firstName: "Tom", lastName: "Kruz", email: "tom@example.com", centers: "Odessa" },
  { id: 4, name: "Jon Freak", firstName: "Jon", lastName: "Freak", email: "jon@example.com", centers: "Dnipro" },
];

function AdminPanel() {
  const [staff, setStaff] = useState(mockData);
  const [selected, setSelected] = useState(staff[0]);
  const [form, setForm] = useState(staff[0]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    setStaff(staff.map((s) => (s.id === form.id ? form : s)));
    alert("Зміни збережено (локально)");
  };

  const handleDelete = () => {
    setStaff(staff.filter((s) => s.id !== selected.id));
    alert("Користувача видалено (локально)");
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-content">
        <div className="staff-section">
          <h2>Staff Members</h2>

          <div className="staff-wrapper">
            {/* LEFT COLUMN */}
            <div className="staff-list">
              {staff.map((emp) => (
                <div
                  key={emp.id}
                  className={`staff-card ${selected.id === emp.id ? "active" : ""}`}
                  onClick={() => {
                    setSelected(emp);
                    setForm(emp);
                  }}
                >
                  <div className="staff-avatar" />
                  <span>{emp.name}</span>
                </div>
              ))}

              {/* Updated pretty button */}
              <button className="add-staff">
                <span style={{ fontSize: "1.4rem", fontWeight: "600", marginRight: "6px" }}>＋</span>
                Add new staff member
              </button>
            </div>

            {/* RIGHT COLUMN */}
            <div className="staff-form">
              <div className="form-avatar">
                <div className="staff-avatar large" />
                <button className="edit-btn">Edit</button>
              </div>

              <label>First name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />

              <label>Last name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />

              <label>Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
              />

              <label>Password</label>
              <input type="password" placeholder="********" />

              <label>Centers</label>
              <input
                name="centers"
                value={form.centers}
                onChange={handleChange}
              />

              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="delete-btn" onClick={handleDelete}>Delete account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
