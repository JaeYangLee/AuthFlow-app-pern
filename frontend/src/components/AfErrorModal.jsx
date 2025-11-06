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
        className="w-screen h-screen flex flex-col items-center justify-center fixed top-0 z-60 p-2"
      >
        <div className="flex flex-col items-center justify-center bg-white p-4 border-2 rounded-lg shadow-[2px_2px_0px_0px] gap-4">
          <section className="flex flex-col items-center justify-center text-center gap-2">
            <header>
              <h1 className="font-bold text-2xl text-red-500">{title}</h1>
            </header>
            <p>
              <span>{subject}</span>
              {message}
            </p>
          </section>
          <section>
            <button onClick={onErrorModalClose} className="px-2 border rounded">
              Okay
            </button>
          </section>
        </div>
      </div>
    </>
  );
}

export default AfErrorModal;
