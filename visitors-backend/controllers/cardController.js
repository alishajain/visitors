const fs = require("fs");
const path = require("path");
const db = require("../db/database");
const multer = require("multer");

// Set up the 'uploads' directory for storing uploaded files
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Create the upload middleware for handling single file uploads with the field name 'Image'
const upload = multer({ storage: storage }).single("Image");

// Function to handle image upload
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const { VisitorName, UserId } = req.body;
    const VisitingCard = path.join("uploads", req.file.filename);

    // Insert image data into the database
    const query =
      "INSERT INTO visiting_cards (VisitorName, VisitingCard, UserId) VALUES (?, ?, ?)";

    const [results] = await db.query(query, [
      VisitorName,
      VisitingCard,
      UserId,
    ]);

    // Return the result to the client
    res.status(200).json({
      message: "card uploaded successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error during card upload:", error);
    return res.status(500).json({ message: "Error uploading card" });
  }
};

// Function to fetch image by RSN
const getImage = async (req, res) => {
  try {
    const { Id } = req.params;

    const query =
      "SELECT VisitorName, VisitingCard FROM visiting_cards WHERE Id = ?";

    // Execute the query to fetch image data
    const [results] = await db.query(query, [Id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json({ data: results });
  } catch (error) {
    // Handle errors in query execution
    console.error("Error fetching card:", error);
    return res.status(500).json({ message: "Error fetching card" });
  }
};

// New function to fetch all visiting cards
const getAllVisitingCards = async (req, res) => {
  try {
    const query = "SELECT * FROM visiting_cards";

    // Execute the query to fetch all records
    const [results] = await db.query(query);

    if (results.length === 0) {
      return res.status(404).json({ message: "No visiting cards found" });
    }

    res.status(200).json({ data: results });
  } catch (error) {
    // Handle errors in query execution
    console.error("Error fetching all cards:", error);
    return res.status(500).json({ message: "Error fetching all cards" });
  }
};

// Export the upload middleware and functions to be used in routes
module.exports = { uploadImage, getImage, getAllVisitingCards, upload };
