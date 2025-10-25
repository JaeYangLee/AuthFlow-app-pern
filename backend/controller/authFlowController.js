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

const findUserByEmail = async (req, res) => {
  const result = await authFlowModel.findUserByEmail();
};
