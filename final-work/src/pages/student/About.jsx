import React from "react";
import HeroBg from "../../assets/above.jpg";

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
              <a
                href="/form"
                className="px-10 py-4 bg-yellow-400 text-black rounded-full font-black hover:bg-yellow-500 transition-all shadow-xl active:scale-95"
              >
                Request Mentor
              </a>
              <a
                href="/project"
                className="px-10 py-4 border-2 border-white/50 backdrop-blur-md rounded-full text-white font-bold hover:bg-white/10 transition-all active:scale-95"
              >
                Explore Projects
              </a>
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
        {teachersData.map((t) => {
          const isFull = t.requestsCount >= REQUEST_LIMIT;
          const initial = t.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2);

          return (
            <div
              key={t.id}
              className={`relative bg-white rounded-[3rem] p-8 transition-all duration-500 border-2 flex flex-col items-center group ${
                isFull
                  ? "border-gray-100 opacity-80"
                  : "border-transparent hover:border-yellow-200 hover:shadow-[0_20px_50px_rgba(245,158,11,0.08)] hover:-translate-y-2 shadow-sm"
              }`}
            >
              {/* Profile Initial Circle */}
              <div
                className={`w-20 h-20 rounded-3xl mb-6 flex items-center justify-center text-2xl font-black transition-all duration-500 rotate-3 group-hover:rotate-0 ${
                  isFull
                    ? "bg-gray-100 text-gray-400"
                    : "bg-yellow-50 text-blue-600 shadow-inner"
                }`}
              >
                {initial}
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

              <p className="text-slate-500 text-center text-sm leading-relaxed mb-8 grow px-2">
                {t.expertise}
              </p>

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
