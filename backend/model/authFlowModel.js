const pool = require("../database/database");
const bcrypt = require("bcrypt");

const createUser = async (
  email,
  password,
  username,
  first_name,
  last_name,
  location,
  role = "user"
) => {
  //Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  //Insert into database
  const result = await pool.query(
    "INSERT INTO users(email, password, username, first_name, last_name, location, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id, email, username, role, created_at;",
    [email, hashedPassword, username, first_name, last_name, location, role]
  );

  return result.rows[0];
};

//for log in
const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT user_id, email, password, role, username, created_at FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail };
