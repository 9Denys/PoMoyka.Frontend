import React from "react";
import "./Employers.css";
import { images } from "../../assets/image.jsx";

export default function Employers() {
  return (
    <div className="admin-employers">
      <div className="employers-list">
        <h2 className="employers-title">Staff Members</h2>

        <div className="employer-card active">
          <img src={images.workerAvatar} alt="Tim Kadilak" className="employer-avatar" />
          <span className="employer-name">Tim Kadilak</span>
        </div>

        <div className="employer-card">
          <img src={images.worker2} alt="Hemec Durak" className="employer-avatar" />
          <span className="employer-name">Hemec Durak</span>
        </div>

        <div className="employer-card">
          <img src={images.worker3} alt="Tom Kruz" className="employer-avatar" />
          <span className="employer-name">Tom Kruz</span>
        </div>

        <div className="employer-card">
          <img src={images.worker4} alt="Jon Freak" className="employer-avatar" />
          <span className="employer-name">Jon Freak</span>
        </div>

        <button className="add-employee">
          + Add new staff members
        </button>
      </div>

      <div className="employer-details">
        <div className="employer-photo-section">
          <img src={images.workerAvatar} alt="Avatar" className="employer-photo" />
          <p className="edit-text">Edit</p>
        </div>

        <form className="employer-form">
          <label>First name</label>
          <input type="text" placeholder="Enter first name" />

          <label>Last name</label>
          <input type="text" placeholder="Enter last name" />

          <label>Email</label>
          <input type="email" placeholder="Enter email" />

          <label>Password</label>
          <input type="password" placeholder="********" />

          <label>Centers</label>
          <input type="text" placeholder="Enter assigned centers" />

          <div className="form-buttons">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="delete-btn">Delete account</button>
          </div>
        </form>
      </div>
    </div>
  );
}
