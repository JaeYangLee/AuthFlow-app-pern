import { Link } from "react-router-dom";

function AFLandingPage() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col border rounded p-4 gap-8">
          <header className="w-full flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Welcome to AuthFlow!</h1>
            <h2 className="text-sm font-light">Choose an action.</h2>
          </header>

          <section className="w-full flex flex-row items-center justify-center gap-2">
            <Link to="/signUp" className="px-2 border rounded text-sm">
              Sign Up
            </Link>
            <Link to="/signIn" className="px-2 border rounded text-sm">
              Sign In
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}

export default AFLandingPage;
