const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  // Import jsonwebtoken
const db = require("../db/database");

const JWT_SECRET = '8200dd45dc0960bc87b98c0b6f86948cdb1defc5d18b6416c4aae12e31f49ace1311597e3a4c1c57ff5c6a113cfbfe90dfac4d2eed036e379bbed9a157257f24';

// Hash the password before saving it
const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Login user (check if the user exists and compare password)
const loginUser = async (req, res) => {
  const { UserID, Password } = req.body;

  if (!UserID || !Password) {
    return res.status(400).json({
      success: false,
      message: "UserID and Password are required.",
    });
  }

  try {
    const [user] = await db.query("SELECT * FROM users WHERE UserID = ?", [UserID]);

    if (!user || user.length === 0) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const isMatch = await bcrypt.compare(Password, user[0].password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { UserID: user[0].UserID, role: user[0].role },
      JWT_SECRET
    );

    res.status(200).json({ success: true, message: "Login successful.", token, role: user[0].role});
  } catch (err) {
    console.error("Error while logging in:", err);
    res.status(500).json({ success: false, message: "Server error while logging in." });
  }
};

// Add new user (with hashed password)
const addUser = async (req, res) => {
  const { UserID, EmpID, Password } = req.body;
  
  if (!UserID || !EmpID || !Password) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: UserID, EmpID, and Password are required.",
    });
  }

  try {
    // Hash the password before saving it
    const hashedPassword = await hashPassword(Password);

    // Insert new user into the database with hashed password
    const result = await db.query(
      "INSERT INTO users (UserID, EmpID, Password) VALUES (?, ?, ?)",
      [UserID, EmpID, hashedPassword]
    );

    // Return success response with the inserted user data
    res.status(201).json({
      success: true,
      id: result.insertId,
      UserID: UserID,
    });
  } catch (err) {
    console.error('Error while adding user:', err);
    res.status(500).json({
      success: false,
      message: "Server error while adding user.",
    });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  addUser,
  loginUser,
  getUsers,
};
