import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AFLogInForm({ onLogIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogIn(email, password);
    setEmail("");
    setPassword("");

    navigate("/profilePage");
  };
  return (
    <>
      <div className="border rounded p-4 flex flex-col gap-4">
        <section>
          <h1 className="text-xl font-bold">Sign In</h1>
        </section>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-12"
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label className="">Enter email:</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-2 border rounded "
              />
            </div>
            <div className="flex flex-col">
              <label>Enter password:</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-2 border rounded"
              />
            </div>
          </div>

          <section className="flex w-full flex-row items-end justify-end gap-2 ">
            <button className="px-2 border rounded">Sign In</button>
            <Link to="/" className="px-2 border rounded">
              Cancel
            </Link>
          </section>
        </form>
      </div>
    </>
  );
}

export default AFLogInForm;
