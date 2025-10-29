import AFLogInForm from "../components/AFLogInForm";

function AFLogInPage({ onLogIn }) {
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <AFLogInForm onLogIn={onLogIn} />
      </div>
    </>
  );
}

export default AFLogInPage;
