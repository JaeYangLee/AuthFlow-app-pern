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
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-start justify-center bg-white p-4 rounded-lg border-2 shadow-[2px_2px_0px_0px] gap-4">
        <header className="text-2xl font-bold">Profile Page</header>

        <section className="flex flex-col gap-2">
          <h1 className="font-bold flex flex-col">
            Username: <span className="font-normal ">{user.username}</span>
          </h1>
          <h1 className="font-bold flex flex-col">
            First Name: <span className="font-normal ">{user.first_name}</span>
          </h1>
          <h1 className="font-bold flex flex-col">
            Last Name: <span className="font-normal ">{user.last_name}</span>
          </h1>
          <h1 className="font-bold flex flex-col">
            Location: <span className="font-normal ">{user.location}</span>
          </h1>
          <h1 className="font-bold flex flex-col">
            Role:
            <span className="font-normal ">{user.role}</span>
          </h1>
          <h1 className="font-bold flex flex-col">
            Email: <span className="font-normal ">{user.email}</span>
          </h1>
          <h1 className="font-bold flex flex-col">
            Created at: <span className="font-normal ">{user.created_at}</span>
          </h1>
        </section>

        <section>
          {user && user.role === "admin" ? (
            <p className="text-red-500 w-full">
              Only the admin can see this message...
            </p>
          ) : (
            <p className="text-blue-500">You are a user...</p>
          )}
        </section>

        <section className="w-full items-end flex justify-end">
          <button onClick={onLogout} className="px-2 border rounded">
            Log out
          </button>
        </section>
      </div>
    </div>
  );
}

export default AfProfilePage;
