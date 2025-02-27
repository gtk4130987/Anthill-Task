import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/aboutus", label: "About Us" },
    { path: "/certified", label: "Certified Pre-Owned" },
  ];

  return (
    <nav
      style={{ zIndex: "1" }}
      className="absolute top-0 left-0 w-full flex items-center justify-between px-10 py-4 bg-transparent text-white"
    >
      {/* Logo */}
      <h1 className="text-2xl font-bold">Carspace</h1>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8 text-lg">
        {navLinks.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`relative text-white font-semibold cursor-pointer transition duration-300 hover:text-red-400 ${
              location.pathname === path ? "border-b-2 border-red-500" : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Right Section: Login Button */}
      <div className="flex items-center space-x-4">
        <Link to="/user-login">
          <button className="bg-red-500 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:bg-red-600 transition duration-300 cursor-pointer">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
