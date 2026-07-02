import { Link } from "react-router-dom";
import LogOutButton from "./LogOutButton";

export default function Header() {
  return (
    <header className="bg-white text-black flex justify-center p-3">
      <div className="w-full max-w-7xl flex justify-between items-center">
        <Link to={"/"}>
          <h1 className="text-3xl">Daily</h1>
        </Link>

        <div className="flex gap-6">
          <Link className="cursor-pointer hover:underline" to={"/browse"}>
            BROWSE
          </Link>

          <LogOutButton />
        </div>
      </div>
    </header>
  );
}
