import axios from "axios";

// Define the base URL for your API
const API_URL = process.env.REACT_APP_API_URL;

// Function to add a new call summary
export const addCallSummary = async (formData) => {
  try {
    console.log(formData);
    const response = await axios.post(`${API_URL}/add-call`, formData);
    return response.data;
  } catch (error) {
    console.error("Error adding call summary:", error);
    throw error;
  }
};

// Function to get all call summaries
export const getAllCallSummaries = async () => {
  try {
    const response = await axios.get(`${API_URL}/call-summaries`);
    return response.data;
  } catch (error) {
    console.error("Error fetching call summaries:", error);
    throw error;
  }
};

// Function to get a call summary by ID
export const getCallSummaryById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/call-summaries/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching call summary with ID ${id}:`, error);
    throw error;
  }
};
