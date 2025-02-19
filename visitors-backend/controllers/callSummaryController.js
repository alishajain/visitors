const db = require("../db/database");

// Add a new call summary
const addCallSummary = async (req, res) => {
  const { ID, CallDate, Summary, UserId } = req.body;

  // Validation: Ensure required fields are provided
  if (!ID || !CallDate || !Summary || !UserId) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const query = `INSERT INTO call_summary (ID, CallDate, Summary, UserId) VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(query, [ID, CallDate, Summary, UserId]);

    res.status(201).json({
      success: true,
      message: "Call summary added successfully",
      id: ID,
    });
  } catch (err) {
    console.error("Error inserting call summary:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// Get all call summaries
const getAllCallSummaries = async (req, res) => {
  try {
    const query = `SELECT * FROM call_summary ORDER BY Date DESC`;
    const [results] = await db.query(query);

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (err) {
    console.error("Error fetching call summaries:", err);
    res.status(500).json({ error: "Failed to fetch call summaries" });
  }
};

// Get a call summary by ID
const getCallSummaryById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    const query = `SELECT * FROM call_summary WHERE ID = ?`;
    const [result] = await db.query(query, [id]);

    if (result.length === 0) {
      return res.status(404).json({ error: "Call summary not found" });
    }

    res.status(200).json({
      success: true,
      data: result[0],
    });
  } catch (err) {
    console.error("Error fetching call summary:", err);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = {
  addCallSummary,
  getAllCallSummaries,
  getCallSummaryById,
};
