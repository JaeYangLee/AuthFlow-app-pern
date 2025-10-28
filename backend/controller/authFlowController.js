const authFlowModel = require("../model/authFlowModel");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { username, first_name, last_name, location, email, password } =
      req.body;

    //validate if the user is already existing
    const existingEmail = await authFlowModel.findUserByEmail(email);
    if (existingEmail) {
      return res
        .status(400)
        .json({ error: "[POST /controller]: User already existing!" });
    }

    console.log("Received body:", req.body);

    // hash password here
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = await authFlowModel.createUser(
      username,
      first_name,
      last_name,
      location,
      email,
      password_hash
    );

    const { password_hash: _, ...safeUser } = newUser;

    res.status(201).json({
      message: "[POST /controller]: New user added!!",
      data: safeUser,
    });
  } catch (err) {
    console.error("[POST /controller]: Error adding user!", err.message);
    res.status(500).json({ error: "[POST /controller]: Server Error!" });
  }
};

// for log in
const findUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const userEmail = await authFlowModel.findUserByEmail(email);

    if (!userEmail) {
      return res
        .status(404)
        .json({ message: "[GET /controller]: User email not found..." });
    }

    const { password_hash: _, ...safeUser } = userEmail;

    res.status(200).json({
      message: "[GET /controller]: User email found!",
      data: safeUser,
    });
  } catch (err) {
    console.error(
      "[GET /controller]: Error finding user by email!",
      err.message
    );
    res.status(500).json({ error: "[GET /controller]: Server error!" });
  }
};

// for profile
const findUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const userUsername = await authFlowModel.findUserByUsername(username);

    if (!userUsername) {
      return res
        .status(404)
        .json({ message: "[GET /controller]: User username not found..." });
    }

    const { password_hash: _, ...safeUser } = userUsername;

    res
      .status(200)
      .json({ message: "[GET /controller]: User user found!", data: safeUser });
  } catch (err) {
    console.error(
      "[GET /controller]: Error finding user username!",
      err.message
    );
    res.status(500).json({ error: "[GET /controller]: Server error!" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { first_name, last_name, location } = req.body;

    const updatedUser = await authFlowModel.updateUser(
      user_id,
      first_name,
      last_name,
      location
    );

    if (!user_id) {
      return res
        .status(404)
        .json({ message: "[PUT /controller]: User not found..." });
    }

    const { password_hash: _, ...safeUser } = updatedUser;

    res.status(200).json({
      message: "[PUT /controller]: User updated successfully!",
      data: safeUser,
    });
  } catch (err) {
    console.error("[PUT /controller]: Error updating user!", err.message);
    res.status(500).json({ error: "[PUT /controller]: Server Error!" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res
        .status(404)
        .json({ message: "[DELETE /controller]: User not found!" });
    }

    const userExist = await authFlowModel.findUserById(user_id);

    if (!userExist) {
      return res
        .status(404)
        .json({ message: "[DELETE /controller]: User not found!" });
    }

    await authFlowModel.deleteUser(user_id);

    return res
      .status(200)
      .json({ message: "[DELETE /controller]: User successfully deleted!" });
  } catch (err) {
    console.error("[DELETE /controller]: Error deleting user!", err.message);
    res.status(500).json("[DELETE /controller]: Server error!");
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByUsername,
  updateUser,
  deleteUser,
};
