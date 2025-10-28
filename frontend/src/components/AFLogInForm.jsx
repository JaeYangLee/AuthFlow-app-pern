function AFLogInForm() {
  const handleSubmit = (e) => {};
  return (
    <>
      <div className="border rounded p-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-12"
        >
          <div>
            <div className="flex flex-col">
              <label>Enter email:</label>
              <input type="text" className="px-2 border rounded" />
            </div>
            <div className="flex flex-col">
              <label>Enter password:</label>
              <input type="password" className="px-2 border rounded" />
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
