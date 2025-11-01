import { useState } from "react";
import "./index.css";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

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

      setUser(loggedInUser.data);
      console.log("User logged in successfulyly:", loggedInUser.data);
    } catch (err) {
      console.error("[POST /App.jsx]: Error logging in user!");
    }
  };

  return (
    <>
      <h1>Hello World!</h1>
    </>
  );
}

export default App;
