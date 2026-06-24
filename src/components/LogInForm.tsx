import { useState } from "react";

export default function LogInForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="bg-black w-screen h-screen flex flex-col items-center justify-center gap-4 text-white">
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

          <div className="flex gap-3">
            <button
              className="w-full cursor-pointer bg-black text-white font-bold rounded-sm p-3 transition-colors border-2 border-white"
              type="submit"
            >
              Sign-Up
            </button>

            <button
              className="w-full cursor-pointer bg-white text-black font-bold rounded-sm p-3 transition-colors"
              type="submit"
            >
              Log-In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
