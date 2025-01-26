import React, { useState } from "react";
import { addRecord } from "../API/RecordApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../Styles/Modal.css";

const AddRecord = () => {
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate(); // Initialize navigate hook

  const initialFormData = {
    CustomerName: "",
    Designation: "",
    CompanyName: "",
    Country: "",
    City: "",
    MobileNo: "",
    PhoneNo: "",
    Email: "",
    Machines: "",
    Guage: "",
    BookingDate: "",
    DeliveryDate: "",
    Remarks: "",
    Source: "", // Added Source field
    Yarn: "",    // Added Yarn field
    Fabric: "",   // Added Fabric field
    UserId: userId,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({}); // Store errors for each field

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validation function
  const validateForm = () => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const newErrors = {};

    // Check if mobile number has at least 10 digits and is not negative
    if (!/^\d{10}$/.test(formData.MobileNo)) {
      newErrors.MobileNo = "Mobile number should be at least 10 digits.";
    } else if (parseInt(formData.MobileNo) < 0) {
      newErrors.MobileNo = "Mobile number cannot be negative.";
    }

    // Check if phone number is not negative
    if (formData.PhoneNo && parseInt(formData.PhoneNo) < 0) {
      newErrors.PhoneNo = "Phone number cannot be negative.";
    }

    // Check if Booking Date is not before current date
    if (formData.BookingDate && formData.BookingDate < currentDate) {
      newErrors.BookingDate = "Booking date should not be before the current date.";
    }

    // Check if Delivery Date is not before Booking Date
    if (formData.DeliveryDate && formData.DeliveryDate < formData.BookingDate) {
      newErrors.DeliveryDate = "Delivery date should not be before the Booking date.";
    }

    // Check if Source is provided
    if (!formData.Source) {
      newErrors.Source = "Source is required.";
    }

    // If there are any errors, set them to state
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    if (!validateForm()) {
      return; // If validation fails, do not submit the form
    }

    // Prepare form data for submission, setting Yarn and Fabric to null if empty
    const dataToSubmit = {
      ...formData,
      Yarn: formData.Yarn.trim() === "" ? null : formData.Yarn,
      Fabric: formData.Fabric.trim() === "" ? null : formData.Fabric,
      BookingDate: formData.BookingDate ? formData.BookingDate : null,
      DeliveryDate: formData.DeliveryDate ? formData.DeliveryDate : null,
      PhoneNo: formData.PhoneNo ? formData.PhoneNo : null,
      Machines: formData.Machines ? formData.Machines : null,
      Guage: formData.Guage ? formData.Guage : null,
      Remarks: formData.Remarks ? formData.Remarks : null,
    };

    try {
      const response = await addRecord(dataToSubmit);
      if (response.success) {
        setMessage("Record added successfully!");
        window.alert("Record added successfully!"); // Show success alert
        setFormData(initialFormData); // Reset form data after successful submission
        setErrors({}); // Clear errors after successful form submission
      } else {
        setMessage("Failed to add record. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      console.error("Error adding record:", error);
    }
  };

  // Handle close button click
  const handleClose = () => {
    navigate("/home"); // Navigate to the home page ("/")
  };

  // Source options array
  const sourceOptions = [
    "Home Tex 2025 Panipat",
    "GMMSA 2025 Ludhiana",
    "IIFF 2025 Delhi",
    "GTTES 2025 Mumbai",
    "Direct Meeting",
    "Social Media",
    "GMMSA 2019",
    "GMMSA 2020",
    "GMMSA 2021",
    "GMMSA 2022",
    "GMMSA 2023",
    "GMMSA 2024",
    "IIFF 2017",
    "IIFF 2018",
    "IIFF 2019",
    "IIFF 2020",
    "IIFF 2021",
    "IIFF 2022",
    "IIFF 2023",
    "IIFF 2024",
    "Others",
  ];

  return (
    <div>
      <div className="modal-overlay">
        <div className="modal">
          <h2>Add New Visitor</h2>
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit} className="modal-form">
            {/* Move Source Dropdown to the top */}
            <div className="modal-row">
              <div
                className={`modal-column ${errors.Source ? "error" : ""}`}
              >
                <label>Source</label>
                <select
                  name="Source"
                  value={formData.Source}
                  onChange={handleChange}
                >
                  <option value="">Select Source</option>
                  {sourceOptions.map((source, index) => (
                    <option key={index} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
                {errors.Source && (
                  <p className="error-message">{errors.Source}</p>
                )}
              </div>
            </div>

            {/* Yarn and Fabric Fields */}

            <div className="modal-row">
              <div
                className={`modal-column ${errors.CustomerName ? "error" : ""}`}
              >
                <label>Customer Name</label>
                <input
                  type="text"
                  name="CustomerName"
                  value={formData.CustomerName}
                  onChange={handleChange}
                  required
                />
                {errors.CustomerName && (
                  <p className="error-message">{errors.CustomerName}</p>
                )}
              </div>
              <div
                className={`modal-column ${errors.Designation ? "error" : ""}`}
              >
                <label>Designation</label>
                <input
                  type="text"
                  name="Designation"
                  value={formData.Designation}
                  onChange={handleChange}
                  required
                />
                {errors.Designation && (
                  <p className="error-message">{errors.Designation}</p>
                )}
              </div>
            </div>
            <div className="modal-row">
              <div
                className={`modal-column ${errors.CompanyName ? "error" : ""}`}
              >
                <label>Company Name</label>
                <input
                  type="text"
                  name="CompanyName"
                  value={formData.CompanyName}
                  onChange={handleChange}
                  required
                />
                {errors.CompanyName && (
                  <p className="error-message">{errors.CompanyName}</p>
                )}
              </div>
              <div
                className={`modal-column ${errors.Country ? "error" : ""}`}
              >
                <label>Country</label>
                <input
                  type="text"
                  name="Country"
                  value={formData.Country}
                  onChange={handleChange}
                />
                {errors.Country && (
                  <p className="error-message">{errors.Country}</p>
                )}
              </div>
            </div>
            <div className="modal-row">
              <div
                className={`modal-column ${errors.City ? "error" : ""}`}
              >
                <label>City</label>
                <input
                  type="text"
                  name="City"
                  value={formData.City}
                  onChange={handleChange}
                />
                {errors.City && <p className="error-message">{errors.City}</p>}
              </div>
              <div
                className={`modal-column ${errors.MobileNo ? "error" : ""}`}
              >
                <label>Mobile No</label>
                <input
                  type="text"
                  name="MobileNo"
                  value={formData.MobileNo}
                  onChange={handleChange}
                />
                {errors.MobileNo && (
                  <p className="error-message">{errors.MobileNo}</p>
                )}
              </div>
            </div>
            <div className="modal-row">
              <div
                className={`modal-column ${errors.PhoneNo ? "error" : ""}`}
              >
                <label>Phone No</label>
                <input
                  type="text"
                  name="PhoneNo"
                  value={formData.PhoneNo}
                  onChange={handleChange}
                />
                {errors.PhoneNo && (
                  <p className="error-message">{errors.PhoneNo}</p>
                )}
              </div>
              <div
                className={`modal-column ${errors.Email ? "error" : ""}`}
              >
                <label>Email</label>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                />
                {errors.Email && (
                  <p className="error-message">{errors.Email}</p>
                )}
              </div>
            </div>
            <div className="modal-row">
              <div
                className={`modal-column ${errors.Yarn ? "error" : ""}`}
              >
                <label>Yarn</label>
                <input
                  type="text"
                  name="Yarn"
                  value={formData.Yarn}
                  onChange={handleChange}
                />
              </div>
              <div
                className={`modal-column ${errors.Fabric ? "error" : ""}`}
              >
                <label>Fabric</label>
                <input
                  type="text"
                  name="Fabric"
                  value={formData.Fabric}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-row">
              {/* Machines and Guage adjacent */}
              <div
                className={`modal-column ${errors.Machines ? "error" : ""}`}
              >
                <label>Machines</label>
                <input
                  type="text"
                  name="Machines"
                  value={formData.Machines}
                  onChange={handleChange}
                />
                {errors.Machines && (
                  <p className="error-message">{errors.Machines}</p>
                )}
              </div>
              <div
                className={`modal-column ${errors.Guage ? "error" : ""}`}
              >
                <label>Guage</label>
                <input
                  type="text"
                  name="Guage"
                  value={formData.Guage}
                  onChange={handleChange}
                />
                {errors.Guage && <p className="error-message">{errors.Guage}</p>}
              </div>
            </div>
            <div className="modal-row">
              <div className="modal-column">
                <label>Tentative Booking Date</label>
                <input
                  type="date"
                  name="BookingDate"
                  value={formData.BookingDate}
                  onChange={handleChange}
                />
                {errors.BookingDate && (
                  <p className="error-message">{errors.BookingDate}</p>
                )}
              </div>
              <div className="modal-column">
                <label>Tentative Delivery Date</label>
                <input
                  type="date"
                  name="DeliveryDate"
                  value={formData.DeliveryDate}
                  onChange={handleChange}
                />
                {errors.DeliveryDate && (
                  <p className="error-message">{errors.DeliveryDate}</p>
                )}
              </div>
            </div>

            {/* Added Remarks Field */}
            <div className="modal-row">
              <div className="modal-column">
                <label>Remarks</label>
                <textarea
                  name="Remarks"
                  value={formData.Remarks}
                  onChange={handleChange}
                  placeholder="Enter remarks here"
                />
              </div>
            </div>

            <div className="button-container">
              <button type="submit">Add Record</button>
              <button className="close-modal-btn" onClick={handleClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecord;
