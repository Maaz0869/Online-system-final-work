import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../../assets/Home1.jpg";
import { Lightbulb, User, Tag, Calendar } from "lucide-react"; // Icons ke liye (optional)

const Project = () => {
  const [ideas, setIdeas] = useState([
    {
      id: 1,
      title: "Face-Attend: AI Roll Call",
      description:
        "Facial-recognition powered attendance for fast, accurate roll calls.",
      category: "AI",
      teacher: "Dr. Ahmed",
      date: "12 Mar 2026",
    },
    {
      id: 2,
      title: "BinRoute: Smart Waste Tracker",
      description:
        "IoT app that monitors bin levels and suggests optimal pickup routes.",
      category: "IoT",
      teacher: "Prof. Sarah",
      date: "10 Mar 2026",
    },
  ]);
  const navigate = useNavigate();

  const TakeIdeaButton = ({ idea }) => {
    const handleTake = () => {
      try {
        // as a fallback store in localStorage so form can read if navigation state lost
        localStorage.setItem("prefillIdea", JSON.stringify(idea));
      } catch (e) {
        // ignore
      }
      navigate("/form", { state: { idea } });
    };

    return (
      <button
        onClick={handleTake}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors flex justify-center items-center gap-2"
        aria-label="Open project in form"
        title="Open project in form"
      >
        Project View
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Hero Section (full width) */}
      <div className="-mx-6 mb-8">
        <div className="relative w-full h-72 md:h-96 lg:h-[40rem] overflow-hidden">
          <img
            src={heroImg}
            alt="Faculty ideas"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-800/55" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-extrabold flex items-center gap-3 text-yellow-200 drop-shadow-lg">
              <Lightbulb className="text-yellow-200" /> Find Top Project Ideas
            </h1>
            <p className="mt-3 text-base md:text-lg text-white drop-shadow">
              Curated, ready-to-start project ideas from faculty — jumpstart
              your FYP today.
            </p>
          </div>
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
          >
            <div className="p-6 grow">
              {/* Category Badge */}
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full mb-4">
                {idea.category}
              </span>

              <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
                {idea.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {idea.description}
              </p>

              <div className="flex items-center text-sm text-gray-500 gap-4 mt-auto">
                <div className="flex items-center gap-1">
                  <User size={14} /> <span>{idea.teacher}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} /> <span>{idea.date}</span>
                </div>
              </div>
            </div>

            {/* Action Button - take idea to form */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <TakeIdeaButton idea={idea} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
