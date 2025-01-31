import axios from "axios";

// Define the base URL for the API
const API_URL = process.env.REACT_APP_API_URL;

// Function to add a new record
export const addRecord = async (recordData) => {
  try {
    const response = await axios.post(`${API_URL}/add-record`, recordData);
    return response.data;
  } catch (error) {
    console.error("Error adding record:", error);
    throw error;
  }
};

// Function to get all records
export const getAllRecords = async () => {
  try {
    const response = await axios.get(`${API_URL}/list-record`);
    return response.data;
  } catch (error) {
    console.error("Error fetching records:", error);
    throw error;
  }
};

// Function to search records by Id
export const searchRecordById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/record/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error searching record by Id:", error);
    throw error;
  }
};

// Function to update an existing record
export const updateRecord = async (id, recordData) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Debug token value

    const response = await axios.put(
      `${API_URL}/update-record/${id}`,
      recordData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the request header
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error updating record:", error);
    throw error;
  }
};

// Function to delete a record by Id
export const deleteRecord = async (id) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await axios.delete(`${API_URL}/record/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the request header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting record:", error);
    throw error;
  }
};
