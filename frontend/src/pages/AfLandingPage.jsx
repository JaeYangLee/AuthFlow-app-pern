import { Link } from "react-router-dom";

function AfLandingPage() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-20 border p-4 rounded-xl bg-white">
          <section className="flex flex-col items-center">
            <h1 className="font-bold text-xl">Welcome to AuthFlow</h1>
            <h3 className="font-light text-sm">Choose an action</h3>
          </section>
          <section className="w-full flex flex-row items-center justify-center gap-2">
            <Link to="/register" className="px-2 border rounded text-sm">
              Register
            </Link>
            <Link to="/login" className="px-2 border rounded text-sm">
              Log in
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}

export default AfLandingPage;
