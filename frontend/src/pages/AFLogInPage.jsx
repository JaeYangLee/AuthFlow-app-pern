import AFLogInForm from "../components/AFLogInForm";

function AFLogInPage({ user, onLogIn }) {
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <AFLogInForm user={user} onLogIn={onLogIn} />
      </div>
    </>
  );
}

export default AFLogInPage;
