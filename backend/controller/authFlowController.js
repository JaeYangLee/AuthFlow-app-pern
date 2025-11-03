const authFlowModel = require("../model/authFlowModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { email, password, username, first_name, last_name, location, role } =
      req.body;

    const newUser = await authFlowModel.createUser(
      email,
      password,
      username,
      first_name,
      last_name,
      location,
      role
    );

    res.status(200).json({
      message: "[POST /controller]: New user created!",
      data: newUser,
    });
  } catch (err) {
    console.error("[POST /controller]: Error creating user!", err.message);
    res.status(500).json({ error: "[POST /controller]: Server error!" });
  }
};

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1: validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "[POST /controller]: Email and password are required!",
      });
    }

    // Step 2: check if user exists
    const foundUser = await authFlowModel.findUserByEmail(email);
    if (!foundUser) {
      return res
        .status(404)
        .json({ message: "[POST /controller]: User not found!" });
    }

    // Step 3: verify password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "[POST /controller]: Invalid credentials!" });
    }

    // Step 4: create JWT (keep secret in .env)
    const SECRET_KEY = process.env.JWT_SECRET || "yourSecretKey";
    const token = jwt.sign(
      { user_id: foundUser.user_id, role: foundUser.role },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    const userResponse = {
      user_id: foundUser.user_id,
      email: foundUser.email,
      username: foundUser.username,
      first_name: foundUser.first_name,
      last_name: foundUser.last_name,
      location: foundUser.location,
      role: foundUser.role,
    };

    res.status(200).json({
      message: "[POST /controller]: Login successful!",
      token,
      user: userResponse,
    });
  } catch (err) {
    console.error(
      "[GET /controller]: Error logging in user email!",
      err.message
    );
    res.status(500).json({ error: "[GET /controller]: Server Error!" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { user_id } = req.params;

    const userProfile = await authFlowModel.getUserProfile(user_id);

    if (!userProfile) {
      return res
        .status(404)
        .json({ message: "[GET /controller]: User not found!" });
    }

    res.status(200).json({
      message: "[GET /controller]: Getting user profile successful!",
      data: userProfile,
    });
  } catch (err) {
    console.error("[GET /controller]: Error getting user profile!");
    res.status(500).json({ error: "[GET /controller]: Server error!" });
  }
};

module.exports = {
  createUser,
  logInUser,
  getUserProfile,
};
