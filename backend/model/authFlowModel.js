const pool = require("../database/database");

const createUser = async (
  username,
  first_name,
  last_name,
  location,
  email,
  password_hash
) => {
  const result = await pool.query(
    `INSERT INTO users(username, first_name, last_name, location, email, password_hash) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [username, first_name, last_name, location, email, password_hash]
  );
  return result.rows[0];
};

// for login
const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

// for profile view
const findUserByUsername = async (username) => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result.rows[0];
};

const updateUser = async (user_id, first_name, last_name, location) => {
  const result = await pool.query(
    "UPDATE users SET first_name = $1, last_name = $2, location = $3 WHERE user_id = $4 RETURNING *",
    [user_id, first_name, last_name, location]
  );
  return result.rows[0];
};

const deleteUser = async (user_id) => {
  const result = await pool.query(
    "DELETE from users WHERE user_id = $1 RETURNING *"
  );

  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByUsername,
  updateUser,
  deleteUser,
};
