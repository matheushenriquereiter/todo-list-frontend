import { useState, type SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function SignUpForm() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const validateUsername = (username: string): boolean => {
    if (!username) {
      setUsernameError("Username is required");
      return false;
    }

    if (username.length < 3 || username.length > 50) {
      setUsernameError("Username must be between 3 and 50 characters long");
      return false;
    }

    return true;
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError("Email is required");
      return false;
    }

    if (!regex.test(email)) {
      setEmailError("Email must be valid");
      return false;
    }

    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }

    if (password.length < 3 || password.length > 50) {
      setPasswordError("Password must be between 3 and 50 characters long");
      return false;
    }

    return true;
  };

  const validateFields = (
    username: string,
    email: string,
    password: string,
  ): boolean => {
    let shouldRequest = true;

    if (!validateUsername(username)) {
      shouldRequest = false;
    }

    if (!validateEmail(email)) {
      shouldRequest = false;
    }

    if (!validatePassword(password)) {
      shouldRequest = false;
    }

    return shouldRequest;
  };

  const loginUser = async (email: string, password: string) => {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const jwtToken = data.jwtToken;
      Cookies.set("jwtToken", jwtToken);
      return;
    }

    const error = await response.json();

    if (error.status === 409) {
      setEmailError("Email already taken");
    }
  };

  const registerUser = async (
    username: string,
    email: string,
    password: string,
  ) => {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      console.log("User has been successfully registered");
      return loginUser(email, password);
    }

    const error = await response.json();

    if (error.status === 409) {
      setEmailError("Email already taken");
    }
  };

  const handleRegisterFormSubmit = async (
    event: SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const shouldRequest = validateFields(username, email, password);

    if (!shouldRequest) return;

    registerUser(username, email, password);
  };

  return (
    <div className="bg-black w-screen h-screen flex flex-col items-center justify-center gap-4 text-white">
      <div className="flex flex-col w-full max-w-xl gap-3">
        <h1 className="text-2xl font-bold text-center">Daily</h1>

        <span className="text-center">The best plan makes the best day</span>

        <form
          onSubmit={handleRegisterFormSubmit}
          className="flex flex-col gap-1 w-full px-4"
        >
          <div>
            <label htmlFor="username" className="flex flex-col text-lg">
              Username *
              <input
                className="border bg-white text-black w-full placeholder-gray-500 rounded-sm p-2"
                onChange={event => {
                  setUsername(event.target.value.trim());
                  setUsernameError("");
                }}
                value={username}
                placeholder="Enter username"
                type="text"
                name="username"
                id="username"
              />
            </label>

            <span className="block text-red-400 text-sm whitespace-pre-wrap min-h-5">
              {usernameError}
            </span>
          </div>

          <div>
            <label htmlFor="email" className="flex flex-col text-lg">
              Email *
              <input
                className="border bg-white text-black w-full placeholder-gray-500 rounded-sm p-2"
                onChange={event => {
                  setEmail(event.target.value.trim());
                  setEmailError("");
                }}
                value={email}
                placeholder="Enter email"
                type="email"
                name="email"
                id="email"
              />
            </label>
            <span className="block text-red-400 text-sm whitespace-pre-wrap min-h-5">
              {emailError}
            </span>
          </div>

          <div>
            <label htmlFor="password" className="flex flex-col text-lg">
              Password *
              <input
                className="border bg-white text-black w-full placeholder-gray-500 rounded-sm p-2"
                onChange={event => {
                  setPassword(event.target.value.trim());
                  setPasswordError("");
                }}
                value={password}
                placeholder="Enter password"
                type="password"
                name="password"
                id="password"
              />
            </label>
            <span className="block text-red-400 text-sm whitespace-pre min-h-5">
              {passwordError}
            </span>
          </div>

          <div className="flex flex-col gap-3 mt-2">
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
