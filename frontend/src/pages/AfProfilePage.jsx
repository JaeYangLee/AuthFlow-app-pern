function AfProfilePage({ user }) {
  return (
    <div>
      <div>
        <header>Profile Page</header>
        <h1>{user.username}</h1>
        <h1>{user.first_name}</h1>
        <h1>{user.last_name}</h1>
        <h1>{user.email}</h1>
      </div>
    </div>
  );
}

export default AfProfilePage;
