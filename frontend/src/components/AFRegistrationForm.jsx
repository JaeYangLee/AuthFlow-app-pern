import { useState } from "react";

function AFRegistrationForm({ onAdd }) {
  const [username, setUserName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd(username, first_name, last_name, location, email, password);

    setUserName("");
    setFirstName("");
    setLastName("");
    setLocation("");
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className="border rounded p-4 ">
        <section>
          <h1 className="text-lg font-bold pb-4">Sign Up</h1>
        </section>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex flex-col">
            <label>Enter username:</label>
            <input
              required
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              className="px-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label>Enter first name:</label>
            <input
              required
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="px-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label>Enter last name:</label>
            <input
              required
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="px-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label>Enter your location:</label>
            <input
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              className="px-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label>Enter your email:</label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="px-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label>Enter your password:</label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="px-2 border rounded"
            />
          </div>

          <section className="flex flex-row items-end justify-end w-full gap-2 py-2">
            <button type="submit" className="px-2 border rounded">
              Sign Up
            </button>
            <button type="button" className="px-2 border rounded">
              Cancel
            </button>
          </section>
        </form>
      </div>
    </>
  );
}

export default AFRegistrationForm;
