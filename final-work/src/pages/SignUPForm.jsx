import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  BookOpen,
  Hash,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Logo from "../assets/uap-logo.png"; // UAP logo path
import Home1 from "../assets/Home1.jpg";

const SignUPForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    regNo: "",
    department: "Computer Science",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Registering Student:", formData);
    // Backend API Call: axios.post('/api/auth/register', formData)
  };

  return (
    <div
      className="min-h-screen bg-[#001529] flex items-center justify-center p-4 font-sans relative overflow-hidden"
      style={{
        backgroundImage: `url(${Home1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Blue tint overlay to give the background a cool blue opacity */}
      <div className="absolute inset-0 bg-blue-700/30 pointer-events-none z-0"></div>

      {/* Background Glows */}
      <div className="absolute top-[-5%] right-[-5%] w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-[1000px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse min-h-[700px] z-10 border border-white/20">
        {/* Right Side: Visual Branding */}
        <div className="md:w-5/12 bg-gradient-to-br from-[#002147] to-[#0a4a8f] p-12 text-white flex flex-col justify-center relative">
          <div className="relative z-10">
            <img
              src={Logo}
              alt="UAP Logo"
              className="h-16 w-auto mb-6 opacity-90"
            />
            <h1 className="text-3xl font-black uppercase italic tracking-tighter leading-none">
              Join the <br />{" "}
              <span className="text-yellow-400">Innovation</span> Hub
            </h1>
            <p className="mt-6 text-blue-100/70 text-sm font-medium leading-relaxed">
              Create your account to submit project proposals and collaborate
              with mentors at UAP.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                <CheckCircle className="text-green-400" size={20} />
                <p className="text-xs font-bold uppercase tracking-widest">
                  Instant Proposal Submission
                </p>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                <CheckCircle className="text-green-400" size={20} />
                <p className="text-xs font-bold uppercase tracking-widest">
                  Direct Mentor Feedback
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Left Side: Signup Form */}
        <div className="md:w-7/12 p-8 md:p-14 flex flex-col justify-center bg-white">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-[#002147] uppercase tracking-tighter">
              Student Registration
            </h2>
            <p className="text-gray-400 font-bold text-sm">
              Fill in your academic details to get started.
            </p>
          </div>

          <form
            onSubmit={handleSignup}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                Full Name
              </label>
              <div className="relative group">
                <User
                  className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#002147]"
                  size={18}
                />
                <input
                  type="text"
                  required
                  placeholder="Enter you full name"
                  className="w-full bg-gray-50 border-2 border-gray-100 p-3.5 pl-12 rounded-2xl outline-none focus:border-[#002147] transition-all font-bold"
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Registration Number */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                Reg. Number
              </label>
              <div className="relative group">
                <Hash
                  className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#002147]"
                  size={18}
                />
                <input
                  type="text"
                  required
                  placeholder="2022-Agr-U-XXX"
                  className="w-full bg-gray-50 border-2 border-gray-100 p-3.5 pl-12 rounded-2xl outline-none focus:border-[#002147] transition-all font-bold uppercase"
                  onChange={(e) =>
                    setFormData({ ...formData, regNo: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                University Email
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#002147]"
                  size={18}
                />
                <input
                  type="email"
                  required
                  placeholder="student@uap.edu.pk"
                  className="w-full bg-gray-50 border-2 border-gray-100 p-3.5 pl-12 rounded-2xl outline-none focus:border-[#002147] transition-all font-bold"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Department */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                Department
              </label>
              <div className="relative group">
                <BookOpen
                  className="absolute left-4 top-3.5 text-gray-400"
                  size={18}
                />
                <select
                  className="w-full bg-gray-50 border-2 border-gray-100 p-3.5 pl-12 rounded-2xl outline-none focus:border-[#002147] appearance-none font-bold cursor-pointer"
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                >
                  <option>Computer Science</option>
                  <option>Information Technology</option>
                  <option>Software Engineering</option>
                  <option>Data Science</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                Create Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-3.5 text-gray-400"
                  size={18}
                />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-2 border-gray-100 p-3.5 pl-12 rounded-2xl outline-none focus:border-[#002147] transition-all font-bold"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                Confirm
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-3.5 text-gray-400"
                  size={18}
                />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-2 border-gray-100 p-3.5 pl-12 rounded-2xl outline-none focus:border-[#002147] transition-all font-bold"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="md:col-span-2 w-full bg-yellow-400 text-[#002147] py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-yellow-500 shadow-xl shadow-yellow-400/20 active:scale-95 transition-all mt-4"
            >
              Register Account <ArrowRight size={20} />
            </button>
          </form>

          <p className="mt-6 text-center text-sm font-bold text-gray-400 uppercase tracking-tighter">
            Already registered?{" "}
            <span className="text-[#002147] cursor-pointer hover:underline">
              Sign In Instead
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUPForm;
