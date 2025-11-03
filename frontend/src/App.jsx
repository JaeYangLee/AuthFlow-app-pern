import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AfLandingPage from "./pages/AfLandingPage";
import AfLoginPage from "./pages/AfLoginPage";
import AfRegisterPage from "./pages/AfRegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AfProfilePage from "./pages/AfProfilePage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user && user.user_id) {
      getUserProfile(user.user_id);
    }
  }, [user]);

  const registerUser = async (
    email,
    password,
    username,
    first_name,
    last_name,
    location,
    role
  ) => {
    try {
      const registeredUser = await axios.post(
        "http://localhost:5000/authflow/register",
        { email, password, username, first_name, last_name, location, role }
      );

      setUser(registeredUser.data);
      console.log("[POST /App.jsx]: User registration successful!");
    } catch (err) {
      console.error("[POST /App.jsx]: Error creating new user!");
    }
  };

  const logInUser = async (email, password) => {
    try {
      const loggedInUser = await axios.post(
        "http://localhost:5000/authflow/login",
        { email, password }
      );

      if (!loggedInUser) {
        console.error("[POST /App.jsx]: Invalid user!");
      }

      const { token, user } = loggedInUser.data;
      localStorage.setItem("token", token);
      setUser(loggedInUser.data);
      console.log("User logged in successfully:", loggedInUser.data);
    } catch (err) {
      if (err.response) {
        console.error(
          "[POST /App.jsx]: Backend responded with an error:",
          err.response.data
        );
      } else if (err.request) {
        console.error("[POST /App.jsx]: No response from server:", err.request);
      } else {
        console.error("[POST /App.jsx]: Something went wrong:", err.message);
      }
    }
  };

  const getUserProfile = async (user_id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/authflow/profile/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(res.data);
    } catch (err) {
      console.error("[GET /App.jsx]: Error fetching userProfile");
    }
  };

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<AfLandingPage />}></Route>
          <Route
            path="/login"
            element={<AfLoginPage onSubmit={logInUser} />}
          ></Route>
          <Route
            path="/register"
            element={<AfRegisterPage onAdd={registerUser} />}
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <AfProfilePage user={getUserProfile} />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
