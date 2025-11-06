import { useState } from "react";
import "./index.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AfLandingPage from "./pages/AfLandingPage";
import AfLoginPage from "./pages/AfLoginPage";
import AfRegisterPage from "./pages/AfRegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AfProfilePage from "./pages/AfProfilePage";
import AfSuccessModal from "./components/AfSuccessModal";
import AfErrorModal from "./components/AfErrorModal";

function App() {
  const [user, setUser] = useState(null);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);

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
        {
          email,
          password,
        }
      );

      if (!loggedInUser) {
        console.error("[POST /App.jsx]: Invalid user!");
      }

      const { token, user } = loggedInUser.data;
      localStorage.setItem("token", token);

      setUser(user);

      if (loggedInUser.status === 200) {
        await setSuccessModalOpen(true);
      }

      console.log("User logged in successfully:", loggedInUser.data);
    } catch (err) {
      if (err.response) {
        await setErrorModalOpen(true);
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

  const logOutUser = async (req, res) => {
    try {
      localStorage.removeItem("token");
      setUser(null);
      console.log("Token Deleted!");
    } catch (err) {
      console.error("[Log out]: Error logging out user!");
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
                <AfProfilePage user={user} onLogout={logOutUser} />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </Router>

      <AfSuccessModal
        isSuccessModalOpen={isSuccessModalOpen}
        onSuccessModalClose={() => setSuccessModalOpen(false)}
        title={"Log in successful!"}
        message={"Now directing to profile page..."}
        buttonOnClick={() => setSuccessModalOpen(false)}
      />

      <AfErrorModal
        isErrorModalOpen={isErrorModalOpen}
        onErrorModalClose={() => setErrorModalOpen(false)}
        title={"Invalid Input!"}
        message={"wrong credentials, user does not exist..."}
        buttonOnClick={() => setErrorModalOpen(false)}
      />
    </>
  );
}

export default App;
