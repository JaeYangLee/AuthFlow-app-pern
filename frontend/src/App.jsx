import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { useState } from "react";
import AFLandingPage from "./pages/AFLandingPage";
import AFLogInPage from "./pages/AFLogInPage";
import AFRegistrationPage from "./pages/AFRegistrationPage";
import AFProfilePage from "./pages/AFProfilePage";

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

      if (!email) {
        console.log("Invalid Email!");
      }

      console.log("[GET /App.jsx]: Log in successful!");
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
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<AFLandingPage />}></Route>
            <Route path="/signIn" element={<AFLogInPage />}></Route>
            <Route path="/signUp" element={<AFRegistrationPage />}></Route>
            <Route path="/profilePage" element={<AFProfilePage />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
