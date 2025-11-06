function AfSuccessModal({
  title,
  subject,
  message,
  buttonOnClick,
  isSuccessModalOpen,
  onSuccessModalClose,
}) {
  if (!isSuccessModalOpen) return null;
  return (
    <>
      <div
        onClick={onSuccessModalClose}
        className="fixed top-0 z-60 w-screen h-screen bg-black/50  flex flex-col items-center justify-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col items-center justify-center bg-white border-2 rounded-lg p-4 gap-4"
        >
          <section className="flex flex-col items-center justify-center">
            <header className="font-bold text-2xl">
              <h1>{title}</h1>
            </header>
            <p className="px-4">
              <span>{subject}</span>
              {message}
            </p>
          </section>

          <section>
            <button onClick={buttonOnClick} className="px-2 border rounded">
              Okay
            </button>
          </section>
        </div>
      </div>
    </>
  );
}

export default AfSuccessModal;
