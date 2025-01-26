import axios from "axios";

// Define the base URL for your API
const API_URL = 'http://localhost:5000/api';

// Function to upload an image
export const uploadImage = async (visitingCard, visitorName, userId) => {
  const formData = new FormData();
  formData.append("Image", visitingCard);
  formData.append("VisitorName", visitorName);
  formData.append("UserId", userId);

  try {
    const response = await axios.post(`${API_URL}/upload-image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 5000, // Set timeout for the request
    });

    return response.data;
  } catch (error) {
    console.error("Error during image upload:", error);
    throw error;
  }
};

// Function to get all visiting cards
export const getAllVisitingCards = async () => {
  try {
    const response = await axios.get(`${API_URL}/visiting-cards`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all visiting cards:", error);
    throw error;
  }
};
