import { type SyntheticEvent, useState } from "react";

export default function PrivateRoute() {
  const [user, setUser] = useState<{ username: string; email: string }>();

  const isLoggedIn = async () => {
    const response = await fetch("http://localhost:8080/auth/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data);
      return;
    }

    const error = await response.json();
    console.log(error);
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    await isLoggedIn();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Jorge</button>
      </form>

      {user?.username}
    </div>
  );
}
