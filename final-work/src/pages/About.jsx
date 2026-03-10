import React from "react";
import HeroBg from "../assets/above.jpg";

const teachersData = [
  { id: 1, name: "Dr. Ahmad Raza", field: "MERN Stack DEVELOPER", expertise: "Machine Learning, NLP, Computer Vision" },
  { id: 2, name: "Prof. Sara Javed", field: "Software Engineering", expertise: "Agile, Project Management, SDLC" },
  { id: 3, name: "Dr. Imran Ali", field: "Data Science", expertise: "Big Data, Data Mining, Predictive Analytics" },
  { id: 4, name: "Prof. Hina Noor", field: "Cyber Security", expertise: "Network Security, Cryptography, Ethical Hacking" },
  { id: 5, name: "Prof. Sara Javed", field: "Specialization", expertise: "Solar Cells, Smart Materials" },
  { id: 6, name: "Dr. Imran Ali", field: "Data Science", expertise: "Network Security, Cryptography, Ethical Hacking" },
];

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen pt-20 md:pt-24 pb-12 overflow-x-hidden">
      {/* Hero Section - Optimized for all screens */}
      <section className="relative w-full mb-12">
        <div
          className="relative py-16 md:py-24 px-6 overflow-hidden min-h-[400px] flex items-center justify-center"
          style={{
            backgroundImage: `url(${HeroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Blue translucent overlay */}
          <div className="absolute inset-0 bg-blue-900/60 z-10" aria-hidden="true" />

          <div className="relative z-20 text-center text-white max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
              Connect with expert mentors for your final year project
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-8 px-2">
              Browse our experienced faculty, learn their fields of expertise,
              and choose the perfect mentor to guide your project.
            </p>
            
            {/* Buttons: Stacked on mobile, side-by-side on desktop */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
              <a
                href="/form"
                className="w-full sm:w-auto px-8 py-3 bg-yellow-400 text-black rounded-2xl font-bold hover:bg-yellow-500 transition text-center shadow-lg"
              >
                Request a Mentor
              </a>
              <a
                href="/project"
                className="w-full sm:w-auto px-8 py-3 border-2 border-white rounded-2xl text-white font-bold hover:bg-white/20 transition text-center"
              >
                View Projects
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Header Text */}
      <div className="max-w-4xl mx-auto text-center mb-12 px-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1e293b] mb-4">
          Meet Our Teachers
        </h1>
        <div className="h-1 w-20 bg-yellow-400 mx-auto mb-4 rounded-full"></div>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          Explore teachers' fields and expertise to select the most suitable
          mentor for your final year project.
        </p>
      </div>

      {/* Teacher Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {teachersData.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-[2rem] p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center group"
          >
            {/* Initial Circle or Icon placeholder can go here */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 group-hover:text-blue-700 transition-colors text-center">
              {t.name}
            </h3>
            <p className="text-[#5c47f5] font-bold text-xs uppercase tracking-widest mb-4">
              {t.field}
            </p>
            <p className="text-gray-500 text-center text-sm leading-relaxed mb-6 grow">
              {t.expertise}
            </p>
            <button className="w-full py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-blue-700 hover:text-white transition-all duration-300 shadow-md active:scale-95 transform">
              Select as Mentor
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}