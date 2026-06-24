import { useState, type SyntheticEvent } from "react";

function App() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const registerUser = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      return;
    }

    console.log("User registered successfully");
  };

  return (
    <div className="bg-black w-screen h-screen flex flex-col items-center justify-center gap-4 text-white">
      <div className="flex flex-col w-full max-w-xl gap-3">
        <h1 className="text-2xl font-bold text-center">Daily</h1>

        <span className="text-center">The best plan makes the best day</span>

        <form
          onSubmit={registerUser}
          className="flex flex-col gap-3 w-full px-4"
        >
          <label htmlFor="username" className="flex flex-col gap-2">
            Username *
            <input
              className="border bg-white text-black w-full placeholder-gray-500 rounded-sm p-2"
              onChange={event => setUsername(event.target.value)}
              value={username}
              placeholder="Enter username"
              type="text"
              name="username"
              id="username"
            />
          </label>

          <label htmlFor="email" className="flex flex-col gap-2">
            Email *
            <input
              className="border bg-white text-black w-full placeholder-gray-500 rounded-sm p-2"
              onChange={event => setEmail(event.target.value)}
              value={email}
              placeholder="Enter email"
              type="email"
              name="email"
              id="email"
            />
          </label>

          <label htmlFor="password" className="flex flex-col gap-2">
            Password *
            <input
              className="border bg-white text-black w-full placeholder-gray-500 rounded-sm p-2"
              onChange={event => setPassword(event.target.value)}
              value={password}
              placeholder="Enter password"
              type="password"
              name="password"
              id="password"
            />
          </label>

          <button
            className="cursor-pointer bg-white text-black font-bold rounded-sm p-3 mt-4 hover:bg-gray-200 transition-colors"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
