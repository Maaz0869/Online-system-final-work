import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      >
        Take Idea
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 flex justify-center items-center gap-2">
          <Lightbulb className="text-yellow-500" /> Faculty Curated Ideas
        </h2>
        <p className="text-gray-600 mt-2">
          Browse concise, ready-to-start FYP ideas from your instructors.
        </p>
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
