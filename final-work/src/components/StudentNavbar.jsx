import React, { useState } from 'react'; // useState add kiya toggle ke liye
import { Link, NavLink } from "react-router";
import Logo from "../assets/uap-logo.png";
import ProfileImg from "../assets/profile.webp";

function StudentNavbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu handle karne ke liye

  const linkClass = ({ isActive }) =>
    `py-1 px-3 text-xl font-bold text-black hover:text-yellow-300 rounded-2xl transition duration-300 border-t-4 ${
      isActive ? "border-yellow-400" : "border-transparent"
    } block md:inline-block`; // Mobile pe block aur desktop pe inline

  return (
    <div>
      <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
        {/* Padding mobile pe px-4 aur desktop pe px-32 */}
        <div className="flex items-center justify-between py-3 px-4 md:px-32">
          
          {/* Left: Logo */}
          <div className="flex items-center z-50">
            <Link to="/">
              <img src={Logo} alt="UAP logo" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Hamburger Menu Icon (Sirf Mobile pe dikhega) */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-black focus:outline-none">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Center & Right: Links and Buttons */}
          {/* Mobile pe ye div full screen overlay ban jayega jab menu khulega */}
          <div className={`${isOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none items-center flex-1 transition-all duration-300 ease-in`}>
            
            {/* Nav Links */}
            <div className="flex flex-col md:flex-row flex-1 justify-center items-center gap-5 py-5 md:py-0 w-full">
                 <NavLink to="/dashboard" className={linkClass} onClick={() => setIsOpen(false)}>Dashboard</NavLink>
              <NavLink to="/" className={linkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
              <NavLink to="/about" className={linkClass} onClick={() => setIsOpen(false)}>About</NavLink>
              <NavLink to="/form" className={linkClass} onClick={() => setIsOpen(false)}>Form</NavLink>
              <NavLink to="/project" className={linkClass} onClick={() => setIsOpen(false)}>Project</NavLink>
             
            </div>

            {/* Right: Buttons & Profile */}
            <div className="flex flex-col md:flex-row items-center gap-3 py-5 md:py-0 px-4">
              <button className="w-full md:w-auto px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition text-sm">
                SignIn/SignUp
              </button>
              <button className="w-full md:w-auto px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition text-sm">
                Logout
              </button>
              <img
                src={ProfileImg}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm hidden md:block"
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

export default StudentNavbar;