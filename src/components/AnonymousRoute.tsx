import { useState, useEffect, type ReactNode } from "react";
import { Navigate } from "react-router-dom";

type User = {
  username: string;
  email: string;
};

type PrivateRouteProps = {
  children: ReactNode;
};

export default function AnonymousRoute({ children }: PrivateRouteProps) {
  const [authenticatedUser, setAuthenticatedUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const requestAuthenticatedUser = () => {
    fetch("/api/auth/me", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then(user => {
        setAuthenticatedUser(user);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(requestAuthenticatedUser, []);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return authenticatedUser ? <Navigate to={"/home"} /> : children;
}
