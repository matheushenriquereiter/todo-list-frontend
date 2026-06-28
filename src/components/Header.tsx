export default function Header() {
  return (
    <header className="border border-black bg-white text-black flex justify-center p-3">
      <div className="w-full max-w-7xl flex justify-between items-center">
        <h1 className="text-3xl">Daily</h1>

        <nav className="flex gap-8">
          <button className="hover:underline cursor-pointer">LOG-IN</button>
          <button className="hover:underline cursor-pointer">SIGN-IN</button>
        </nav>
      </div>
    </header>
  );
}
