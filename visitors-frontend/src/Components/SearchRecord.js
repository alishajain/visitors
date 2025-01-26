import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchRecordById, deleteRecord } from "../API/RecordApi";
import UpdateRecord from "./UpdateRecord"; // Assuming UpdateRecord component exists
import "../Styles/SearchRecord.css";

const SearchRecord = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const navigate = useNavigate();

  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditable, setIsEditable] = useState(false); // Control whether we are in editable state

  // Fetch the record data by ID
  useEffect(() => {
    if (id) {
      const fetchRecord = async () => {
        try {
          const data = await searchRecordById(id);
          setRecord(data.data);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch record");
          setLoading(false);
        }
      };

      fetchRecord();
    } else {
      setError("No ID found in the navigation state.");
      setLoading(false);
    }
  }, [id]);

  const handleUpdate = () => {
    const userRole = localStorage.getItem("role"); // Get the role of the logged-in user

    if (userRole === "admin") {
      setIsEditable(true); // Toggle editable mode when Update is clicked
    } else {
      alert("You don't have access to update this record");
    }
  };

  const handleDelete = async () => {
    const userRole = localStorage.getItem("role"); // Get the role of the logged-in user

    if (userRole === "admin") {
      try {
        await deleteRecord(id);
        navigate("/show-all-records"); // Navigate back to the records list after deletion
      } catch (err) {
        setError("Failed to delete the record");
      }
    } else {
      alert("You don't have access to delete this record");
    }
  };

  const handleClose = () => {
    navigate("/show-all-records"); // Navigate back to the records list
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  // Helper function to check if the value is empty, null, or "n/a"
  const displayField = (value) => {
    if (!value || value === "n/a") {
      return ""; // Return empty string if value is empty, null or "n/a"
    }
    return new Date(value).toLocaleDateString(); // Return formatted date if it's valid
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!record) {
    return <div>No record found with the provided ID.</div>;
  }

  return (
    <div className="SearchRecord-container">
      <h1>Record Details</h1>

      {isEditable ? (
        <UpdateRecord
          record={record}
          isEditable={isEditable}
          handleChange={handleChange}
          handleUpdate={handleUpdate}
        />
      ) : (
        <div className="SearchRecord-table-container">
          <table>
            <tbody>
              <tr>
                <th>ID</th>
                <td>{record.Id}</td>
              </tr>
              <tr>
                <th>Source</th>
                <td>{record.Source}</td>
              </tr>
              <tr>
                <th>Customer Name</th>
                <td>{record.CustomerName}</td>
              </tr>
              <tr>
                <th>Designation</th>
                <td>{record.Designation}</td>
              </tr>
              <tr>
                <th>Company Name</th>
                <td>{record.CompanyName}</td>
              </tr>
              <tr>
                <th>Country</th>
                <td>{record.Country}</td>
              </tr>
              <tr>
                <th>City</th>
                <td>{record.City}</td>
              </tr>
              <tr>
                <th>Mobile No</th>
                <td>{record.MobileNo}</td>
              </tr>
              <tr>
                <th>Phone No</th>
                <td>{record.PhoneNo}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{record.Email}</td>
              </tr>
              <tr>
                <th>Yarn</th>
                <td>{record.Yarn}</td>
              </tr>
              <tr>
                <th>Fabric</th>
                <td>{record.Fabric}</td>
              </tr>
              <tr>
                <th>Machines</th>
                <td>{record.Machines}</td>
              </tr>
              <tr>
                <th>Guage</th>
                <td>{record.Guage}</td>
              </tr>
              <tr>
                <th>Booking Date</th>
                <td>{displayField(record.BookingDate)}</td>
              </tr>
              <tr>
                <th>Delivery Date</th>
                <td>{displayField(record.DeliveryDate)}</td>
              </tr>
              <tr>
                <th>Remarks</th>
                <td>{record.Remarks}</td>
              </tr>
              <tr>
                <th>UserId</th>
                <td>{record.UserId}</td>
              </tr>
              <tr>
                <th>Entry Date</th>
                <td>{displayField(record.Date)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="SearchRecord-buttons">
        {isEditable ? (
          <button onClick={() => setIsEditable(false)}>Cancel</button>
        ) : (
          <button onClick={handleUpdate}>Update</button>
        )}
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default SearchRecord;
