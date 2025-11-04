import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AfRegisterPage({ onAdd }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password || !username) {
        return;
      }

      const response = await onAdd(
        email,
        password,
        username,
        first_name,
        last_name,
        location,
        role
      );

      if (response?.status === 200) {
        navigate("/");
      }

      setUsername("");
      setFirstName("");
      setLastName("");
      setLocation("");
      setEmail("");
      setPassword("");
      setRole("");
    } catch (err) {
      console.error(
        "[POST /AFRegisterPage.jsx]: Error submitting user credentials"
      );
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded">
          <header className="flex items-end w-full text-xl font-bold">
            Registration
          </header>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-12 py-4 text-sm w-[50vw]"
          >
            <section className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label className="font-light">Enter username</label>
                <input
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className="px-2 border rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-light">Enter first name</label>
                <input
                  required
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  className="px-2 border rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-light">Enter last name</label>
                <input
                  required
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  className="px-2 border rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-light">Enter location</label>
                <input
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  className="px-2 border rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-light">Enter email</label>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="px-2 border rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-light">Enter password</label>
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="px-2 border rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-light">Choose your role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value={"user"} className="px-2 border rounded">
                    User
                  </option>
                  <option value={"admin"} className="px-2 border rounded">
                    Admin
                  </option>
                </select>
              </div>
            </section>
            <section className="flex flex-row items-end justify-end w-full gap-2">
              <button type="submit" className="px-2 border rounded">
                Register
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-2 border rounded"
              >
                Cancel
              </button>
            </section>
          </form>
        </div>
      </div>
    </>
  );
}

export default AfRegisterPage;
