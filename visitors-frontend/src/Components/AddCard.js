import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { uploadImage } from "../API/ImageApi";
import "../Styles/UploadCard.css";

const AddCard = () => {
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate(); // Initialize the navigate function

  const [visitorName, setVisitorName] = useState("");
  const [visitingCard, setVisitingCard] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (event) => {
    setVisitingCard(event.target.files[0]);
  };

  const handleNameChange = (event) => {
    setVisitorName(event.target.value);
  };

  const resetForm = () => {
    setVisitorName("");
    setVisitingCard("");
    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!visitingCard || !visitorName || !userId) {
      setError("All fields are required.");
      alert("All fields are required.");
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const data = await uploadImage(visitingCard, visitorName, userId);
      setSuccessMessage(data.message); // Show success message
      alert(data.message); // Display success alert
      resetForm(); // Reset the form after success
    } catch (error) {
      setError("Failed to upload the image.");
      alert("Failed to upload the image."); // Display failure alert
    } finally {
      setIsUploading(false); // Set uploading state to false once done
    }
  };

  // Navigate to the /home route when the Back button is clicked
  const handleBack = () => {
    navigate("/home"); // Navigate to /home
  };

  return (
    <div className="upload-image-container">
      <h1>Upload Visitor's Card</h1>

      <button onClick={handleBack} className="back-button">Back</button> {/* Back button */}

      <form onSubmit={handleSubmit} className="upload-image-form">
        <div className="form-group">
          <label htmlFor="visitorName">Visitor Name:</label>
          <input
            type="text"
            id="visitorName"
            name="visitorName"
            value={visitorName}
            onChange={handleNameChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="visitingCard">Select Visiting Card:</label>
          <input
            type="file"
            id="visitingCard"
            name="visitingCard"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>

        {isUploading ? (
          <button type="submit" disabled>
            Uploading...
          </button>
        ) : (
          <button type="submit">Upload Image</button>
        )}
      </form>

      {error && <div className="error-message">{error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default AddCard;
