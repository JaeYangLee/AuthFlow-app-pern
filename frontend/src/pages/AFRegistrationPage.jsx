import AFRegistrationForm from "../components/AFRegistrationForm";

function AFRegistrationPage({ onAdd }) {
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <AFRegistrationForm onAdd={onAdd} />
      </div>
    </>
  );
}

export default AFRegistrationPage;
