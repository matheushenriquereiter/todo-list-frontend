import { useState } from "react";
import { Link } from "react-router";

export default function LogInForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col w-full max-w-xl gap-3">
        <h1 className="text-2xl font-bold text-center">Daily</h1>

        <span className="text-center">The best plan makes the best day</span>

        <form className="flex flex-col gap-4 w-full px-4">
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
            <Link to="/sign-up" className="w-full">
              <button
                className="w-full cursor-pointer bg-black text-white font-bold rounded-sm p-3 transition-colors border-2 border-white"
                type="submit"
              >
                Log-In
              </button>
            </Link>

            <span>
              Don't have an account?{" "}
              <Link className="font-bold hover:underline" to="/sign-up">
                Sign-Up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
