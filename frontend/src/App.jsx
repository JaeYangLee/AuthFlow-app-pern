import axios from "axios";
import "./index.css";
import AFRegistrationPage from "./pages/AFRegistrationPage";
import AFLoginPage from "./pages/AFLogInPage";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  const createUser = async (
    username,
    first_name,
    last_name,
    location,
    email,
    password
  ) => {
    try {
      const res = await axios.post(`http://localhost:5000/users`, {
        username,
        first_name,
        last_name,
        location,
        email,
        password,
      });
      setUser(res.data);
    } catch (err) {
      console.error("[POST /App.jsx]: Error creating user!", err.message);
    }
  };

  const findUserByEmail = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5000/users/email/${email}`);
      setUser(res.data);
    } catch (err) {
      console.error("[GET /App.jsx]: Error finding user email!", err.message);
    }
  };

  const findUserByUsername = async (username) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/users/username/${username}`
      );
      setUser(res.data);
    } catch (err) {
      console.error(
        "[GET /App.jsx]: Error finding user username!",
        err.message
      );
    }
  };

  const updateUser = async (user_id, first_name, last_name, location) => {
    try {
      const res = await axios.put(`http://localhost:5000/users/${user_id}`, {
        first_name,
        last_name,
        location,
      });
      setUser(res.data);
    } catch (err) {
      console.error("[PUT /App.jsx]: Error updating user!", err.message);
    }
  };

  const deleteUser = async (user_id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${user_id}`, {
        user_id,
      });
      setUser(null);
    } catch (err) {
      console.error("[DELETE /App.jsx]: Error deleting user!");
    }
  };

  return (
    <>
      <AFLoginPage user={user} onLogIn={findUserByEmail} />
      <AFRegistrationPage onAdd={createUser} />
    </>
  );
}

export default App;
