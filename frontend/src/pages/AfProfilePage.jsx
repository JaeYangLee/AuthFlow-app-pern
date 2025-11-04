import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AfProfilePage({ onLogout }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const authToken = localStorage.getItem("token");
        if (!authToken) return;

        const res = await axios.get("http://localhost:5000/authflow/profile", {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        setUser(res.data.data);
      } catch (err) {
        console.error(
          "[GET /App.jsx]: Error fetching user profile",
          err.response?.data || err.message
        );

        // If 404 (user not found) or token invalid → clear state & token
        setUser(null);
        localStorage.removeItem("token");
        navigate("/login"); // redirect to login
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <p>Loading user profile...</p>;
  return (
    <div>
      <div>
        <header>Profile Page</header>

        <h1>Username: {user.username}</h1>
        <h1>First Name: {user.first_name}</h1>
        <h1>Last Name: {user.last_name}</h1>
        <h1>Location: {user.location}</h1>
        <h1>Role: {user.role}</h1>
        <h1>Email: {user.email}</h1>
        <button onClick={onLogout} className="px-2 border rounded">
          Log out
        </button>
      </div>
    </div>
  );
}

export default AfProfilePage;
