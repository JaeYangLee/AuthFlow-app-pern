function AfProfilePage({ user, onLogout }) {
  return (
    <div>
      <div>
        <header>Profile Page</header>
        <h1>{user.user_id}</h1>
        <h1>{user.username}</h1>
        <h1>{user.first_name}</h1>
        <h1>{user.last_name}</h1>
        <h1>{user.email}</h1>
        <button onClick={onLogout} className="px-2 border rounded">
          Log out
        </button>
      </div>
    </div>
  );
}

export default AfProfilePage;
