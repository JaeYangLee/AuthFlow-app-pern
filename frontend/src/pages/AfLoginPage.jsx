import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AfSuccessModal from "../components/AfSuccessModal";

function AfLoginPage({ onSubmit }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        return;
      }

      setSuccessModalOpen(true);
      await onSubmit(email, password);

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("[POST /AfLoginPage.jsx]: Error logging in user!");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <div className="flex flex-col gap-4 p-4 bg-white  rounded-lg border-2 shadow-[2px_2px_0px_0px]">
          <header>
            <h1 className="flex flex-col text-2xl font-bold">Log in</h1>
          </header>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-12 w-[50vw]"
          >
            <section className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label>Enter email:</label>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="px-2 border rounded"
                />
              </div>
              <div className="flex flex-col">
                <label>Enter password:</label>
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="px-2 border rounded"
                />
              </div>
            </section>

            <section className="flex flex-row items-end justify-end w-full gap-2">
              <button type="submit" className="px-2 border rounded">
                Log in
              </button>
              <button
                type="button"
                onClick={(e) => navigate("/")}
                className="px-2 border rounded"
              >
                Cancel
              </button>
            </section>
          </form>
        </div>
      </div>

      <AfSuccessModal
        isSuccessModalOpen={isSuccessModalOpen}
        onSuccessModalClose={() => setSuccessModalOpen(false)}
        title={"Log in successful!"}
        message={"Now directing to profile page..."}
        buttonOnClick={() => navigate("/profile")}
      />
    </>
  );
}

export default AfLoginPage;
