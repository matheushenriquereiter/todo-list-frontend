import { useNavigate } from "react-router-dom";

export default function LogOutButton() {
  const navigate = useNavigate();

  const logOut = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return;
    }

    navigate("/log-in");
  };

  return (
    <button onClick={logOut} className="hover:underline cursor-pointer">
      LOG-OUT
    </button>
  );
}
