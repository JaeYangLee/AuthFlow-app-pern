function AfErrorModal({
  title,
  subject,
  message,
  buttonOnClick,
  isErrorModalOpen,
  onErrorModalClose,
}) {
  if (!isErrorModalOpen) return null;

  return (
    <>
      <div
        onClick={buttonOnClick}
        className="w-screen h-screen flex flex-col items-center justify-center fixed top-0 z-60"
      >
        <div>
          <section>
            <header>
              <h1>{title}</h1>
            </header>
            <p>
              <span>{subject}</span>
              {message}
            </p>
          </section>
          <section>
            <button onClick={buttonOnClick}>Okay</button>
          </section>
        </div>
      </div>
    </>
  );
}

export default AfErrorModal;
