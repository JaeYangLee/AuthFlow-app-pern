import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AFProfilePage({}) {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/users/username/${username}`
        );
        setUser(res.data);
      } catch (err) {
        console.error(
          "[GET /AFProfilePage.jsx]: Error fetching user!",
          err.message
        );
      }
    };

    fetchUser();
  }, [username]);

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="border rounded p-4">
          {user ? (
            <section>
              <h1>@{user.username}</h1>
              <h2>
                {user.first_name} {user.last_name}
              </h2>
              <h2>{user.location}</h2>
              <p>{user.email}</p>
              <p>{user.role}</p>
            </section>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default AFProfilePage;
