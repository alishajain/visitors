import React from "react";
import { useSelector } from "react-redux";
import { updateRecord } from "../API/RecordApi";

const UpdateRecord = ({ record, isEditable, handleChange, handleUpdate }) => {
  const userId = useSelector((state) => state.user.userId);

  // Handle the Save button click to update the record via API
  const handleSave = async () => {
    try {
      // Ensure that BookingDate and DeliveryDate are either in 'yyyy-mm-dd' format or NULL
      const updatedData = {
        ...record,
        updatedBy: userId,
        BookingDate: record.BookingDate ? formatDate(record.BookingDate) : null, // If empty, set to NULL
        DeliveryDate: record.DeliveryDate
          ? formatDate(record.DeliveryDate)
          : null, // If empty, set to NULL
        PhoneNo: record.PhoneNo || null, // Ensure PhoneNo is handled
        Machines: record.Machines || null, // Ensure Machines is handled
        Guage: record.Guage || null, // Ensure Guage is handled
        Remarks: record.Remarks || null, // Ensure Remarks is handled
        Yarn: record.Yarn || null, // Ensure Yarn is handled
        Fabric: record.Fabric || null, // Ensure Fabric is handled
        Source: record.Source || null, // Ensure Source is handled
        UserId: record.UserId || null, // Ensure UserId is handled (can be set by the system)
      };
      await updateRecord(record.Id, updatedData);
      handleUpdate(updatedData);

      // Show a success alert
      alert("Record updated successfully!");
    } catch (error) {
      console.error("Error updating the record", error);

      // Show an error alert
      alert("Failed to update record. Please try again.");
    }
  };

  // Function to format date in 'yyyy-mm-dd' format
  const formatDate = (dateString) => {
    if (!dateString) return null; // Return null if the date is empty
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handle date change event to ensure the date is in proper format ('yyyy-mm-dd')
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    // Only update the date with the formatted string (without time or timezone)
    handleChange({ target: { name, value: value } });
  };

  // Function to render value with fallback for empty or 'n/a'
  const renderFieldValue = (fieldValue) => {
    return fieldValue && fieldValue !== "n/a" ? fieldValue : "";
  };

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
    <div className="SearchRecord-table-container">
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <td>
              {isEditable ? (
                <input
                  type="text"
                  name="Id"
                  value={record.Id}
                  onChange={handleChange}
                  disabled
                />
              ) : (
                record.Id
              )}
            </td>
          </tr>
          <tr>
            <th>Source</th>
            <td>
              {isEditable ? (
                <select
                  name="Source"
                  value={record.Source || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Source</option>
                  {sourceOptions.map((sourceOption, index) => (
                    <option key={index} value={sourceOption}>
                      {sourceOption}
                    </option>
                  ))}
                </select>
              ) : (
                renderFieldValue(record.Source)
              )}
            </td>
          </tr>
          <tr>
            <th>Customer Name</th>
            <td>
              {isEditable ? (
                <input
                  type="text"
                  name="CustomerName"
                  value={record.CustomerName}
                  onChange={handleChange}
                />
              ) : (
                record.CustomerName
              )}
            </td>
          </tr>
          <tr>
            <th>Designation</th>
            <td>
              {isEditable ? (
                <input
                  type="text"
                  name="Designation"
                  value={record.Designation}
                  onChange={handleChange}
                />
              ) : (
                record.Designation
              )}
            </td>
          </tr>
          <tr>
            <th>Company Name</th>
            <td>
              {isEditable ? (
                <input
                  type="text"
                  name="CompanyName"
                  value={record.CompanyName}
                  onChange={handleChange}
                />
              ) : (
                record.CompanyName
              )}
            </td>
          </tr>
          <tr>
            <th>Country</th>
            <td>
              {isEditable ? (
                <input
                  type="text"
                  name="Country"
                  value={record.Country}
                  onChange={handleChange}
                />
              ) : (
                record.Country
              )}
            </td>
          </tr>
          <tr>
            <th>City</th>
            <td>
              {isEditable ? (
                <input
                  type="text"
                  name="City"
                  value={record.City}
                  onChange={handleChange}
                />
              ) : (
                record.City
              )}
            </td>
          </tr>
          <tr>
            <th>Mobile No</th>
            <td>
              {isEditable ? (
                <input
                  type="text"
                  name="MobileNo"
                  value={renderFieldValue(record.MobileNo)}
                  onChange={handleChange}
                />
              ) : (
                renderFieldValue(record.MobileNo)
              )}
            </td>
          </tr>
          <tr>
            <th>Phone No</th>
            <td>
              {isEditable ? (
                <input
                  type="text"
                  name="PhoneNo"
                  value={renderFieldValue(record.PhoneNo)}
                  onChange={handleChange}
                />
              ) : (
                renderFieldValue(record.PhoneNo)
              )}
            </td>
          </tr>
          <tr>
            <th>Email</th>
            <td>
              {isEditable ? (
                <input
                  type="email"
                  name="Email"
                  value={record.Email}
                  onChange={handleChange}
                />
              ) : (
                record.Email
              )}
            </td>
          </tr>
          {/* Yarn and Fabric fields */}
          <tr>
            <th>Yarn</th>
            <td>
              {isEditable ? (
                <input
                  type="text"
                  name="Yarn"
                  value={renderFieldValue(record.Yarn)}
                  onChange={handleChange}
                />
              ) : (
                renderFieldValue(record.Yarn)
              )}
            </td>
          </tr>
          <tr>
            <th>Fabric</th>
            <td>
              {isEditable ? (
                <input
                  type="text"
                  name="Fabric"
                  value={renderFieldValue(record.Fabric)}
                  onChange={handleChange}
                />
              ) : (
                renderFieldValue(record.Fabric)
              )}
            </td>
          </tr>
          <tr>
            <th>Machines</th>
            <td>
              {isEditable ? (
                <input
                  type="text"
                  name="Machines"
                  value={renderFieldValue(record.Machines)}
                  onChange={handleChange}
                />
              ) : (
                renderFieldValue(record.Machines)
              )}
            </td>
          </tr>
          <tr>
            <th>Guage</th>
            <td>
              {isEditable ? (
                <input
                  type="text"
                  name="Guage"
                  value={renderFieldValue(record.Guage)}
                  onChange={handleChange}
                />
              ) : (
                renderFieldValue(record.Guage)
              )}
            </td>
          </tr>
          <tr>
            <th>Tentative Booking Date</th>
            <td>
              {isEditable ? (
                <input
                  type="date"
                  name="BookingDate"
                  value={formatDate(record.BookingDate)} // Convert to 'yyyy-mm-dd' format
                  onChange={handleDateChange} // Handle date change
                />
              ) : (
                renderFieldValue(record.BookingDate) &&
                new Date(record.BookingDate).toLocaleDateString() // Display date as localized string if not empty
              )}
            </td>
          </tr>
          <tr>
            <th>Tentative Delivery Date</th>
            <td>
              {isEditable ? (
                <input
                  type="date"
                  name="DeliveryDate"
                  value={formatDate(record.DeliveryDate)} // Convert to 'yyyy-mm-dd' format
                  onChange={handleDateChange} // Handle date change
                />
              ) : (
                renderFieldValue(record.DeliveryDate) &&
                new Date(record.DeliveryDate).toLocaleDateString() // Display date as localized string if not empty
              )}
            </td>
          </tr>
          {/* New columns: Source, UserId, and Entry Date */}
          <tr>
            <th>UserId</th>
            <td>{record.UserId}</td> {/* UserId is typically not editable */}
          </tr>
          <tr>
            <th>Entry Date</th>
            <td>{record.Date}</td>
          </tr>
          <tr>
            <th>Remarks</th>
            <td>
              {isEditable ? (
                <input
                  type="text"
                  name="Remarks"
                  value={renderFieldValue(record.Remarks)}
                  onChange={handleChange}
                />
              ) : (
                renderFieldValue(record.Remarks) || "No Remarks"
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="SearchRecord-buttons">
        <button onClick={handleSave}>{isEditable ? "Save" : "Update"}</button>
      </div>
    </div>
  );
};

export default UpdateRecord;
