import React from "react";
import "./Profile.css";
import { ArrowLeft } from "lucide-react";

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="header">
        <button className="back-button">
          <ArrowLeft color="#f5b000" size={28} />
        </button>
        <h2 className="profile-title">Profile</h2>
      </div>

      <div className="profile-photo">
        <div className="photo-circle"></div>
        <p>Photo Profile</p>
      </div>

      <form className="profile-form">
        <div className="input-grid">
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Full Name" />
          </div>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Full Name" />
          </div>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Full Name" />
          </div>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Full Name" />
          </div>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Full Name" />
          </div>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Full Name" />
          </div>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Full Name" />
          </div>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Full Name" />
          </div>
        </div>

        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
