import React from "react";
import HomeBg from "../../assets/Home1.jpg";

const Home = () => {
  return (
    <main className="min-h-screen bg-white pt-16 md:pt-20">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[60vh] md:h-150 flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${HomeBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#002147]/90 md:from-[#002147]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-3xl text-white">
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold leading-tight mb-4 drop-shadow-md">
              University of Agriculture, <br className="hidden md:block" />
              <span className="text-yellow-400 md:text-white"> Peshawar</span>
            </h1>
            <p className="text-sm md:text-lg opacity-90 max-w-xl">
              Knowledge, Character, and Service for a Sustainable Future.
            </p>
            <button className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-[#002147] font-bold rounded-lg transition">
              Explore Programs
            </button>
          </div>
        </div>
      </section>

      {/* 2. Stats Section (Responsive Counters) */}
      <section className="py-12 bg-[#002147] text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-yellow-400">
              12k+
            </h3>
            <p className="text-sm md:text-base">Students</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-yellow-400">
              500+
            </h3>
            <p className="text-sm md:text-base">Faculty Members</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-yellow-400">
              45+
            </h3>
            <p className="text-sm md:text-base">Departments</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-yellow-400">
              1st
            </h3>
            <p className="text-sm md:text-base">Agriculture Rank</p>
          </div>
        </div>
      </section>

      {/* 3. Featured Categories (Cards) */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#002147]">
          Our Academic Excellence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Research", "Academics", "Admissions"].map((item) => (
            <div
              key={item}
              className="p-8 border rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border-gray-100 group"
            >
              <div className="h-12 w-12 bg-yellow-100 rounded-lg mb-4 group-hover:bg-yellow-400 transition-colors"></div>
              <h4 className="text-xl font-bold mb-2">{item}</h4>
              <p className="text-gray-600 text-sm">
                Providing world-class facilities and education in the heart of
                Peshawar.
              </p>
              <button className="mt-4 text-blue-600 font-semibold hover:underline">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Spotlight Section - small decorative cards to improve visual appeal */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-[#002147] mb-8">
            Spotlight
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm group transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-lg flex flex-col items-start gap-4">
              <div className="text-3xl bg-yellow-50 text-yellow-600 rounded-lg p-3 transition-colors group-hover:bg-yellow-400 group-hover:text-white">
                🎓
              </div>
              <h4 className="font-bold text-lg">Expert Faculty</h4>
              <p className="text-sm text-gray-600">
                Learn from experienced researchers and industry professionals.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm group transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-lg flex flex-col items-start gap-4">
              <div className="text-3xl bg-yellow-50 text-yellow-600 rounded-lg p-3 transition-colors group-hover:bg-yellow-400 group-hover:text-white">
                🔬
              </div>
              <h4 className="font-bold text-lg">Modern Labs</h4>
              <p className="text-sm text-gray-600">
                State-of-the-art facilities that support research and
                innovation.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm group transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-lg flex flex-col items-start gap-4">
              <div className="text-3xl bg-yellow-50 text-yellow-600 rounded-lg p-3 transition-colors group-hover:bg-yellow-400 group-hover:text-white">
                🤝
              </div>
              <h4 className="font-bold text-lg">Placement Support</h4>
              <p className="text-sm text-gray-600">
                Industry links and career services to launch your future.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
