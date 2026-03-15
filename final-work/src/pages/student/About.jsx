import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroBg from "../../assets/above.jpg";
import Logo from "../../assets/uap-logo.png";

const teachersData = [
  {
    id: 1,
    name: "Dr. Ahmad Raza",
    field: "MERN Stack DEVELOPER",
    expertise: "Machine Learning, NLP, Computer Vision",
    requestsCount: 10,
  },
  {
    id: 2,
    name: "Prof. Sara Javed",
    field: "Software Engineering",
    expertise: "Agile, Project Management, SDLC",
    requestsCount: 4,
  },
  {
    id: 3,
    name: "Dr. Imran Ali",
    field: "Data Science",
    expertise: "Big Data, Data Mining, Predictive Analytics",
    requestsCount: 10,
  },
  {
    id: 4,
    name: "Prof. Hina Noor",
    field: "Cyber Security",
    expertise: "Network Security, Cryptography, Ethical Hacking",
    requestsCount: 2,
  },
  {
    id: 5,
    name: "Prof. Sana Gull",
    field: "Specialization",
    expertise: "Solar Cells, Smart Materials",
    requestsCount: 8,
  },
  {
    id: 6,
    name: "Dr. Zeeshan Khan",
    field: "Mobile App Dev",
    expertise: "React Native, Flutter, Firebase",
    requestsCount: 1,
  },
];

export default function About() {
  const REQUEST_LIMIT = 10;
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (e) {
      return null;
    }
  });

  // helper to normalize saved teacher objects into the shape this component expects
  const normalizeSaved = (s) => ({
    id: s.id ?? s.email ?? Math.random().toString(36).slice(2, 8),
    name: s.name || s.fullName || s.email || "Unnamed",
    // older saves may use `designation` instead of `field`
    field: s.field || s.designation || s.specialization || "Specialization",
    // expertise may be stored as string or array
    expertise: Array.isArray(s.expertise)
      ? s.expertise
      : typeof s.expertise === "string"
        ? s.expertise
        : [],
    requestsCount: typeof s.requestsCount === "number" ? s.requestsCount : 0,
    bio: s.bio || "",
    office: s.office || "",
    profileImg: s.profileImg || null,
    email: s.email || "",
  });

  // combine initial static data with any saved teacher profiles in localStorage
  const [teachers, setTeachers] = useState(() => {
    try {
      const raw = localStorage.getItem("teachers");
      const saved = raw ? JSON.parse(raw) : [];
      const normalized = saved.map(normalizeSaved);
      // merge: saved (normalized) first, then defaults that don't have same email
      const emails = new Set(normalized.map((s) => s.email));
      const merged = [
        ...normalized,
        ...teachersData.filter((t) => !emails.has(t.email)),
      ];
      return merged;
    } catch (err) {
      return teachersData;
    }
  });

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "user") {
        try {
          setUser(JSON.parse(e.newValue));
        } catch (err) {
          setUser(null);
        }
      }
      if (e.key === "teachers") {
        try {
          const saved = e.newValue ? JSON.parse(e.newValue) : [];
          const normalized = saved.map(normalizeSaved);
          const emails = new Set(normalized.map((s) => s.email));
          const merged = [
            ...normalized,
            ...teachersData.filter((t) => !emails.has(t.email)),
          ];
          setTeachers(merged);
        } catch (err) {
          setTeachers(teachersData);
        }
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // also update when the page mounts in case localStorage was set in same tab
  useEffect(() => {
    try {
      const raw = localStorage.getItem("teachers");
      const saved = raw ? JSON.parse(raw) : [];
      const emails = new Set(saved.map((s) => s.email));
      const merged = [
        ...saved,
        ...teachersData.filter((t) => !emails.has(t.email)),
      ];
      setTeachers(merged);
    } catch (err) {
      setTeachers(teachersData);
    }
  }, []);

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-20 md:pt-24 pb-12 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full mb-16">
        <div
          className="relative py-20 md:py-32 overflow-hidden rounded-[2.5rem] flex items-center justify-center w-full shadow-2xl"
          style={{
            backgroundImage: `url(${HeroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/60 z-10" />
          <div className="relative z-20 text-center text-white w-full px-6 md:px-12">
            <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6 tracking-tight">
              Find Your <span className="text-yellow-400">Perfect</span> Mentor
            </h2>
            <p className="text-blue-100 text-lg mb-8 opacity-90">
              Browse our world-class faculty and secure your supervisor for your
              Final Year Project.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {user && user.role === "student" && (
                <Link
                  to="/form"
                  className="px-10 py-4 bg-yellow-400 text-black rounded-full font-black hover:bg-yellow-500 transition-all shadow-xl active:scale-95"
                >
                  Request Mentor
                </Link>
              )}
              <Link
                to="/project"
                className="px-10 py-4 border-2 border-white/50 backdrop-blur-md rounded-full text-white font-bold hover:bg-white/10 transition-all active:scale-95"
              >
                Explore Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Header Text */}
      <div className="max-w-4xl mx-auto text-center mb-16 px-6">
        <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-sm">
          Faculty Members
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-2 mb-4">
          Meet Our Experts
        </h1>
        <div className="h-1.5 w-24 bg-yellow-400 mx-auto rounded-full shadow-sm"></div>
      </div>

      {/* Teacher Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {teachers.map((t) => {
          const isFull = t.requestsCount >= REQUEST_LIMIT;
          const initial = t.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2);

          return (
            <div
              key={t.id}
              className={`relative bg-gray-300 rounded-[3rem] p-8 transition-all duration-500 border-2 flex flex-col items-center group ${
                isFull
                  ? "border-gray-100 opacity-80"
                  : "border-transparent hover:border-yellow-200 hover:shadow-[0_20px_50px_rgba(245,158,11,0.08)] hover:-translate-y-2 shadow-sm"
              }`}
            >
              {/* small logo badge */}
              <img
                src={Logo}
                alt="logo"
                className="w-10 h-10 object-contain absolute top-4 left-4 opacity-90"
              />

              {/* Profile Initial / Photo */}
              <div className="mb-6">
                {t.profileImg ? (
                  <div className="w-20 h-20 rounded-3xl overflow-hidden mb-0 shadow-inner transition-all duration-500 rotate-3 group-hover:rotate-0">
                    <img
                      src={t.profileImg}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className={`w-20 h-20 rounded-3xl mb-0 flex items-center justify-center text-2xl font-black transition-all duration-500 rotate-3 group-hover:rotate-0 ${isFull ? "bg-gray-100 text-gray-400" : "bg-yellow-50 text-blue-600"}`}
                  >
                    {initial}
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div
                className={`absolute top-6 right-8 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${
                  isFull
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {isFull ? "Full" : "Available"}
              </div>

              <h3 className="text-2xl font-black text-slate-800 mb-1 text-center group-hover:text-yellow-600 transition-colors">
                {t.name}
              </h3>
              <p className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-6">
                {t.field}
              </p>

              {/* Bio */}
              {t.bio && (
                <p className="text-slate-600 text-center text-sm leading-relaxed mb-3 px-2">
                  {t.bio}
                </p>
              )}

              {/* Office */}
              {t.office && (
                <div className="mb-3 text-center">
                  <span className="text-xs text-slate-500 font-semibold mr-2">
                    🏢
                  </span>
                  <span className="text-xs text-slate-700">{t.office}</span>
                </div>
              )}

              {/* Expertise chips */}
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {(typeof t.expertise === "string"
                  ? t.expertise.split(",")
                  : Array.isArray(t.expertise)
                    ? t.expertise
                    : [t.expertise]
                ).map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-3 py-1 rounded-full bg-white/70 border border-white/30 text-slate-700 font-semibold"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>

              {/* Progress & Slot Info */}
              <div className="w-full space-y-3 mb-8">
                <div className="flex justify-between text-[11px] font-black uppercase text-slate-400 tracking-tighter">
                  <span>Capacity</span>
                  <span className={isFull ? "text-red-500" : "text-slate-600"}>
                    {t.requestsCount} / {REQUEST_LIMIT}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      isFull
                        ? "bg-gradient-to-r from-red-500 to-orange-500"
                        : "bg-gradient-to-r from-blue-500 to-indigo-500"
                    }`}
                    style={{
                      width: `${(t.requestsCount / REQUEST_LIMIT) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Action Button */}
              <button
                disabled={isFull}
                className={`w-full py-4 font-black rounded-2xl transition-all duration-300 shadow-lg text-xs uppercase tracking-widest active:scale-95 ${
                  isFull
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                    : "bg-[#002147] text-white hover:bg-blue-600 hover:shadow-blue-200"
                }`}
              >
                {isFull ? "Slot Unavailable" : "Select Mentor"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
