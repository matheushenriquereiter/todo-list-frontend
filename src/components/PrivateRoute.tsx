import { useState, useEffect, type ReactNode } from "react";
import { Navigate } from "react-router-dom";

type User = {
  username: string;
  email: string;
};

type PrivateRouteProps = {
  children: ReactNode;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const [user, setUser] = useState<User>();

  const requestUser = () => {
    fetch("/api/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then(response => response.json())
      .then(user => {
        console.log(user);
        setUser(user);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(requestUser, []);

  return user ? children : <Navigate to={"/log-in"} />;
}
