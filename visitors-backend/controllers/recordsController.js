const db = require("../db/database");

// Add a new record to the database
const addRecord = async (req, res) => {
  const {
    CustomerName,
    Designation,
    CompanyName,
    Country,
    City,
    MobileNo,
    PhoneNo,
    Email,
    Machines,
    Guage,
    BookingDate,
    DeliveryDate,
    UserId,
    Remarks,
    Source,
    Yarn,
    Fabric, // Ensure this field is included
  } = req.body;

  // Basic validation: Ensure all required fields are provided
  if (
    !CustomerName ||
    !CompanyName ||
    !Email ||
    !MobileNo ||
    !UserId ||
    !Source
  ) {
    return res
      .status(400)
      .json({
        error:
          "Please provide all required fields, including UserId, Source, Yarn, and Fabric.",
      });
  }

  // Validate Email (must be in a valid email format)
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(Email)) {
    return res
      .status(400)
      .json({ error: "Please provide a valid email address." });
  }

  try {
    // SQL query to insert the record into the database
    const query = `
      INSERT INTO records 
      (CustomerName, Designation, CompanyName, Country, City, MobileNo, PhoneNo, Email, Machines, Guage, BookingDate, DeliveryDate, UserId, Remarks, Source, Yarn, Fabric)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Execute the query with the provided data
    const [results] = await db.query(query, [
      CustomerName,
      Designation,
      CompanyName,
      Country,
      City,
      MobileNo,
      PhoneNo,
      Email,
      Machines,
      Guage,
      BookingDate,
      DeliveryDate,
      UserId,
      Remarks,
      Source, // Include Source in the query
      Yarn, // Include Yarn in the query
      Fabric, // Include Fabric in the query (This was missing before)
    ]);

    res.status(201).json({
      success: true,
      message: "Record added successfully",
      data: { CustomerName, CompanyName },
    });
  } catch (err) {
    console.error("Error inserting record data:", err);
    res.status(500).json({ error: "Failed to add record" });
  }
};

// Get all records from the database
const getAllRecords = async (req, res) => {
  try {
    const query = "SELECT * FROM records";

    // Execute the query to fetch all records
    const [results] = await db.query(query);

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (err) {
    console.error("Error fetching all records:", err);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

// Get records by CustomerName or CompanyName
const searchRecords = async (req, res) => {
  const id = req.params.Id;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    const [rows] = await db.query("SELECT * FROM records WHERE Id = ?", [id]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Visitor record not found." });
    }

    res.status(200).json({ success: true, data: rows[0] });
  } catch (err) {
    console.error("Error fetching visitor details:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching visitor details.",
        error: err.message,
      });
  }
};

// Update an existing record
const updateRecord = async (req, res) => {
  const {
    Id,
    CustomerName,
    Designation,
    CompanyName,
    Country,
    City,
    MobileNo,
    PhoneNo,
    Email,
    Machines,
    Guage,
    BookingDate,
    DeliveryDate,
    UserId,
    Remarks,
    Source,
    Yarn,
    Fabric,
  } = req.body;

  // Basic validation: Ensure that required fields are provided
  if (
    !Id ||
    !CustomerName ||
    !CompanyName ||
    !Email ||
    !MobileNo ||
    !Source 
  ) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields." });
  }

  // Validate Email format
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(Email)) {
    return res
      .status(400)
      .json({ error: "Please provide a valid email address." });
  }

  try {
    const query = `
      UPDATE records 
      SET CustomerName = ?, Designation = ?, CompanyName = ?, Country = ?, City = ?, MobileNo = ?, PhoneNo = ?, Email = ?, Machines = ?, Guage = ?, BookingDate = ?, DeliveryDate = ?, UserId = ?, Remarks = ?, Source = ?, Yarn = ?, Fabric = ?, Updated_at = CURRENT_TIMESTAMP
      WHERE Id = ?
    `;

    // Execute the update query
    const [results] = await db.query(query, [
      CustomerName,
      Designation,
      CompanyName,
      Country,
      City,
      MobileNo,
      PhoneNo,
      Email,
      Machines,
      Guage,
      BookingDate,
      DeliveryDate,
      UserId,
      Remarks,
      Source,
      Yarn, // Include Yarn in the query
      Fabric, // Include Fabric in the query
      Id,
    ]);

    if (results.affectedRows > 0) {
      res.status(200).json({
        success: true,
        message: "Record updated successfully",
      });
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (err) {
    console.error("Error updating record:", err);
    res.status(500).json({ error: "Failed to update record" });
  }
};

// Delete a record
const deleteRecord = async (req, res) => {
  const { Id } = req.params;

  try {
    const query = "DELETE FROM records WHERE Id = ?";

    const [results] = await db.query(query, [Id]);

    if (results.affectedRows > 0) {
      res.status(200).json({
        success: true,
        message: "Record deleted successfully",
      });
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (err) {
    console.error("Error deleting record:", err);
    res.status(500).json({ error: "Failed to delete record" });
  }
};

module.exports = {
  addRecord,
  getAllRecords,
  searchRecords,
  updateRecord,
  deleteRecord,
};
