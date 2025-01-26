import React from "react";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate for redirection
import "../Styles/Home.css";

const Home = () => {
  const navigate = useNavigate();  // Initialize the navigate hook

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    
    navigate("/");
  };

  return (
    <div>
      <h1 className="home-header">Welcome to Visitor's Book</h1>

      {/* Container with buttons */}
      <div className="home-buttons-container">
        <div className="home-button">
          <Link to="/add-record">
            <button className="home-btn">Add New Visitor</button>
          </Link>
        </div>
        <div className="home-button">
          <Link to="/add-card">
            <button className="home-btn">Add Visiting Card</button>
          </Link>
        </div>
        <div className="home-button">
          <Link to="/show-all-records">
            <button className="home-btn">Display All Visitors</button>
          </Link>
        </div>
        <div className="home-button">
          <Link to="/show-all-cards">
            <button className="home-btn">Display All Visiting Cards</button>
          </Link>
        </div>
        <div className="home-button">
          <button className="home-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
