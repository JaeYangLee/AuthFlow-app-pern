import { useState } from "react";

function AFLogInForm({ user, onLogIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {};
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
                type=""
                placeholder="example@gmail.com"
                className="px-2 border rounded "
              />
            </div>
            <div className="flex flex-col">
              <label>Enter password:</label>
              <input
                type="password"
                placeholder="********"
                className="px-2 border rounded"
              />
            </div>
          </div>

          <section className="flex w-full flex-row items-end justify-end gap-2 ">
            <button className="px-2 border rounded">Sign In</button>
            <button className="px-2 border rounded">Cancel</button>
          </section>
        </form>
      </div>
    </>
  );
}

export default AFLogInForm;
