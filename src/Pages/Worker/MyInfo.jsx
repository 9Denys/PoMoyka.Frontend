import React from "react";
import "./MyInfo.css";
import { images } from "../../assets/image.jsx";

export default function MyInfo() {
  return (
    <div className="worker-myinfo">
      <h1 className="info-title">My Info</h1>

      <form className="info-form">
        <div className="info-avatar">
          <img src={images.workerAvatar} alt="Avatar" className="avatar-img" />
          <p className="edit-label">Edit</p>
        </div>

        <div className="info-fields">
          <label>First Name</label>
          <input type="text" placeholder="Enter your first name" />

          <label>Last Name</label>
          <input type="text" placeholder="Enter your last name" />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="********" />

          <button type="button" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
