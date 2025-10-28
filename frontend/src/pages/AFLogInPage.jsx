import AFLogInForm from "../components/AFLogInForm";

function AFLogInPage() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <AFLogInForm user={user} onAdd={onAdd} />
      </div>
    </>
  );
}

export default AFLogInPage;
