import React, { useState, useEffect } from "react";
import { getAllRecords } from "../API/RecordApi";
import { useNavigate } from "react-router-dom";
import "../Styles/Table.css"; 

const ShowAll = () => {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("CustomerName"); 

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await getAllRecords();
        setRecords(data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch records");
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const formatDate = (date) => {
    if (!date) return "N/A";
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString();
  };

  const filteredRecords = records.filter((record) => {
    const searchLower = searchQuery.toLowerCase();
    
    if (searchBy === "CustomerName") {
      return record.CustomerName?.toLowerCase().includes(searchLower);
    } else if (searchBy === "CompanyName") {
      return record.CompanyName?.toLowerCase().includes(searchLower);
    } else if (searchBy === "MobileNo") {
      return record.MobileNo?.toString().includes(searchQuery);
    }
    
    return false;
  });

  // Navigate to /home when "Back" button is clicked
  const handleBackClick = () => {
    navigate("/home");
  };

  // Navigate to /search-records when "Show Details" button is clicked
  const handleShowDetails = (id) => {
    navigate(`/show-details/${id}`, { state: { id } });
  };
  

  return (
    <div className="table-container">
      {/* Back Button */}
      <button onClick={handleBackClick} className="back-btn">Back</button>

      <h1>All Records</h1>
      
      <div className="search-bar-container">
        <label htmlFor="searchQuery" className="search-label">Search: </label>
        <input
          type="text"
          id="searchQuery"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter search term"
          className="search-input"
        />

        <div className="search-options">
          <label>
            <input
              type="radio"
              value="CustomerName"
              checked={searchBy === "CustomerName"}
              onChange={() => setSearchBy("CustomerName")}
            />
            Customer Name
          </label>
          <label>
            <input
              type="radio"
              value="CompanyName"
              checked={searchBy === "CompanyName"}
              onChange={() => setSearchBy("CompanyName")}
            />
            Company Name
          </label>
          <label>
            <input
              type="radio"
              value="MobileNo"
              checked={searchBy === "MobileNo"}
              onChange={() => setSearchBy("MobileNo")}
            />
            Mobile No
          </label>
        </div>
      </div>
      
      <table className="records-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Source</th>
            <th>Customer Name</th>
            <th>Designation</th>
            <th>Company Name</th>
            <th>Country</th>
            <th>City</th>
            <th>Mobile No</th>
            <th>Phone No</th>
            <th>Email</th>
            <th>Actions</th> {/* Added Actions column for Show Details */}
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.Id}>
              <td>{record.Id}</td>
              <td>{record.Source}</td>
              <td>{record.CustomerName}</td>
              <td>{record.Designation}</td>
              <td>{record.CompanyName}</td>
              <td>{record.Country}</td>
              <td>{record.City}</td>
              <td>{record.MobileNo}</td>
              <td>{record.PhoneNo}</td>
              <td>{record.Email}</td>
              <td>
                {/* Show Details Button */}
                <button 
                  onClick={() => handleShowDetails(record.Id)} 
                  className="details-btn">
                  Show Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowAll;
