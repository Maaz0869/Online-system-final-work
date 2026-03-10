import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/uap-logo.png";
import ProfileImg from "../assets/profile.webp";

function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Admin ke liye hum thoda different active color ya style use kar sakte hain
  const linkClass = ({ isActive }) =>
    `py-1 px-3 text-lg font-bold text-gray-800 hover:text-red-600 rounded-2xl transition duration-300 border-t-4 ${
      isActive ? "border-red-500 text-red-600" : "border-transparent"
    } block md:inline-block`;

  return (
    <div>
      <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-50 border-b-2 border-red-50">
        <div className="flex items-center justify-between py-3 px-4 md:px-32">
          {/* Left: Logo & Admin Tag */}
          <div className="flex items-center gap-3 z-50">
            <Link to="/admin/dashboard">
              <img src={Logo} alt="UAP logo" className="h-10 w-auto" />
            </Link>
            <span className="hidden sm:block bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">
              ADMIN PANEL
            </span>
          </div>

          {/* Hamburger Menu Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Nav Links & Actions */}
          <div
            className={`${isOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none items-center flex-1 transition-all duration-300 ease-in`}
          >
            {/* Admin Specific Links */}
            <div className="flex flex-col md:flex-row flex-1 justify-center items-center gap-4 py-5 md:py-0 w-full">
              <NavLink
                to="/admin/dashboard"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/admin/Add-teacher"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                Add Teacher
              </NavLink>
              <NavLink
                to="/admin/all-projects"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                Projects
              </NavLink>
              <NavLink
                to="/admin/reports"
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                Reports
              </NavLink>
            </div>

            {/* Right: Profile & Logout */}
            <div className="flex flex-col md:flex-row items-center gap-3 py-5 md:py-0 px-4">
              <button className="w-full md:w-auto px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition text-sm font-semibold">
                Logout
              </button>
              <img
                src={ProfileImg}
                alt="Admin Profile"
                className="h-10 w-10 rounded-full object-cover border-2 border-red-200 shadow-sm hidden md:block"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16 md:h-24" aria-hidden></div>
    </div>
  );
}

export default AdminNavbar;
