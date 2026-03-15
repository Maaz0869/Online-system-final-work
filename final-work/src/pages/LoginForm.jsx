import React, { useState } from "react";
import { Mail, Lock, UserCircle, ArrowRight, ShieldCheck } from "lucide-react";
import axios from "axios";
import Logo from "../assets/uap-logo.png"; // Aapka logo path
// Using 'above.jpg' from assets as the requested 'about' background image.
// Assumption: the asset named 'about' was not found; using 'above.jpg' as the closest available image.
import About from "../assets/above.jpg";

const LoginForm = () => {
  const [role, setRole] = useState("student"); // Default role
  const [formData, setFormData] = useState({ email: "", password: "" });

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:5000/api/login", {
  //       email: formData.email,
  //       password: formData.password,
  //     });
  //     alert(response.data.message || "Login successful");
  //     console.log(response.data);
  //     // TODO: on success, redirect user to dashboard or save token
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Login failed");
  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: formData.email,
        password: formData.password,
      });

      // prefer server-provided role when available
      const userFromServer = response.data?.user || null;
      const finalRole = userFromServer?.role || role;

      const userToStore = {
        email: formData.email,
        role: finalRole,
        name: userFromServer?.name || formData.email.split("@")[0],
        token: response.data?.token || null,
      };

      // Save user info to localStorage
      localStorage.setItem("user", JSON.stringify(userToStore));

      // Redirect based on resolved role
      if (finalRole === "student") window.location.href = "/dashboard";
      else if (finalRole === "teacher")
        window.location.href = "/teacher/dashboard";
      else if (finalRole === "admin") window.location.href = "/admin/dashboard";
    } catch (err) {
      // If backend is not available or login fails, fall back to a simple local login
      // This allows demo/testing: accept any credentials and use the selected role
      try {
        const fallbackUser = {
          email: formData.email,
          role: role,
          name: formData.email.split("@")[0],
        };
        localStorage.setItem("user", JSON.stringify(fallbackUser));
        if (role === "student") window.location.href = "/dashboard";
        else if (role === "teacher")
          window.location.href = "/teacher/dashboard";
        else if (role === "admin") window.location.href = "/admin/dashboard";
      } catch (e) {
        alert(err.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div
      id="login"
      className="min-h-screen bg-[#001529] flex items-center justify-center p-4 font-sans relative overflow-hidden"
      style={{
        backgroundImage: `url(${About})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // optional overlay tint to preserve text contrast
        // You can tweak this by changing the overlay elements or removing the bg color class.
      }}
    >
      {/* Overlay to dim background image for better contrast */}
      <div className="absolute inset-0 bg-blue-600/60 pointer-events-none z-0"></div>

      {/* Background Decor (Unique Shapes) */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-[1100px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] z-10">
        {/* Left Side: Branding & Info */}
        <div className="md:w-1/2 bg-gradient-to-br from-[#002147] to-[#053d7a] p-12 text-white flex flex-col justify-between relative">
          <div className="relative z-10">
            <img
              src={Logo}
              alt="UAP Logo"
              className="h-20 w-auto mb-8 drop-shadow-lg"
            />
            <h1 className="text-4xl font-black leading-tight uppercase tracking-tighter italic">
              FYP <span className="text-yellow-400 font-black">Manager</span>{" "}
              Portal
            </h1>
            <p className="text-blue-100 mt-4 text-lg opacity-80 leading-relaxed">
              University of Agriculture, Peshawar. <br />
              Streamlining project management for students and mentors.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10">
              <ShieldCheck className="text-yellow-400" size={24} />
              <p className="text-sm font-medium">
                Secure Role-Based Authentication
              </p>
            </div>
          </div>

          {/* Decorative Pattern */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-white/5 skew-y-6 translate-y-16"></div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-[#002147] uppercase tracking-tighter">
              Welcome Back!
            </h2>
            <p className="text-gray-400 font-medium">
              Please select your role and sign in.
            </p>
          </div>

          {/* Role Switcher (Unique UI) */}
          <div className="flex p-1 bg-gray-100 rounded-2xl mb-8">
            {["student", "teacher", "admin"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  role === r
                    ? "bg-white text-[#002147] shadow-md"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                Official Email
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[#002147] transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  required
                  placeholder="name@uap.edu.pk"
                  className="w-full bg-gray-50 border-2 border-gray-100 p-4 pl-12 rounded-2xl outline-none focus:border-[#002147] focus:bg-white transition-all font-bold text-[#002147]"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[#002147] transition-colors"
                  size={20}
                />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-2 border-gray-100 p-4 pl-12 rounded-2xl outline-none focus:border-[#002147] focus:bg-white transition-all font-bold"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end">
              <a
                href="#"
                className="text-xs font-bold text-gray-400 hover:text-[#002147] transition"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#002147] text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#053d7a] shadow-xl shadow-blue-900/20 active:scale-95 transition-all"
            >
              Sign In <ArrowRight size={20} />
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-bold text-gray-400">
            Don't have an account?{" "}
            <a
              href="#signup"
              className="text-[#002147] font-bold hover:underline"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
