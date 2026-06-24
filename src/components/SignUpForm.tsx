import { useState, type SyntheticEvent } from "react";
import { Link } from "react-router-dom";

export default function SignInForm() {
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
          className="flex flex-col gap-4 w-full px-4"
        >
          <label htmlFor="username" className="flex flex-col gap-1">
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

          <label htmlFor="email" className="flex flex-col gap-1">
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

          <label htmlFor="password" className="flex flex-col gap-1">
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

          <div className="flex flex-col gap-3">
            <button
              className="w-full cursor-pointer bg-black text-white font-bold rounded-sm p-3 transition-colors border-2 border-white"
              type="submit"
            >
              Sign-Up
            </button>

            <span>
              Already have an account?{" "}
              <Link className="font-bold hover:underline" to="/log-in">
                Log-In
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
