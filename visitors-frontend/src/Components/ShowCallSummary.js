import React, { useState, useEffect } from "react";
import { getCallSummaryById, addCallSummary } from "../API/CallApi";
import { useSelector } from "react-redux";

const ShowCallSummary = ({ id }) => {
  const userId = useSelector((state) => state.user.userId);

  const [callSummary, setCallSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    ID: id,
    CallDate: "",
    Summary: "",
    UserId: userId,
  });

  useEffect(() => {
    if (userId) {
      setFormData((prev) => ({ ...prev, UserId: userId }));
    }
  }, [userId]);

  useEffect(() => {
    const fetchCallSummary = async () => {
      try {
        const data = await getCallSummaryById(id);
        setCallSummary(data.data);
      } catch (err) {
        setError("Failed to fetch call summary.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCallSummary();
    }
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCallSummary(formData);
      setShowForm(false);
      alert("Call summary added successfully!");
    } catch (err) {
      alert("Error adding call summary.");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB"); // Formats as dd-mm-yyyy
  };

  return (
    <div className="SearchRecord-container">
      <h1>Call Summary Details</h1>

      <div className="SearchRecord-buttons">
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "Add Call Summary"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="SearchRecord-form">
          <label>
            Call Date:
            <input
              type="date"
              name="CallDate"
              value={formData.CallDate}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Summary:
            <textarea
              name="Summary"
              value={formData.Summary}
              onChange={handleInputChange}
              required
            />
          </label>

          <div className="SearchRecord-buttons">
            <button type="submit">Save Call Summary</button>
          </div>
        </form>
      )}

      {loading ? (
        <p>Loading call summary...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : !callSummary ? (
        <p>No call summary found.</p>
      ) : (
        <div className="SearchRecord-table-container">
          <table>
            <thead>
              <tr>
                <th>Call Date</th>
                <th>Summary</th>
                <th>User ID</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{formatDate(callSummary.CallDate)}</td>
                <td>{callSummary.Summary}</td>
                <td>{callSummary.UserId}</td>
                <td>{formatDate(callSummary.Date)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowCallSummary;
