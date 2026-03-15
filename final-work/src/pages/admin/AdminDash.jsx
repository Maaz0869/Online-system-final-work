import React, { useState, useEffect } from "react";
import {
  Search,
  RotateCcw,
  Eye,
  CheckCircle,
  XCircle,
  ShieldCheck,
  ListChecks,
  Hourglass,
  CheckSquare,
  XSquare,
} from "lucide-react";

const AdminDash = () => {
  const [projectList, setProjectList] = useState([
    {
      id: 1,
      student: "Ali Khan",
      title: "E-Commerce App",
      status: "Pending",
      teacherStatus: "Approved",
    },
    {
      id: 2,
      student: "Hamza",
      title: "Chatbot",
      status: "Approved",
      teacherStatus: "Approved",
    },
    {
      id: 3,
      student: "Saba",
      title: "Library Management",
      status: "Rejected",
      teacherStatus: "Rejected",
    },
    {
      id: 4,
      student: "Bilal Khan",
      title: "Task Manager",
      status: "Pending",
      teacherStatus: "Pending",
    },
    {
      id: 5,
      student: "Manahil",
      title: "Portfolio Site",
      status: "Approved",
      teacherStatus: "Approved",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleStatusUpdate = (id, newStatus) => {
    setProjectList((prev) =>
      prev.map((proj) =>
        proj.id === id ? { ...proj, status: newStatus } : proj,
      ),
    );
  };

  const filteredProjects = projectList.filter(
    (proj) =>
      proj.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // --- Stats Calculation ---
  const stats = {
    total: projectList.length,
    pending: projectList.filter((p) => p.status === "Pending").length,
    approved: projectList.filter((p) => p.status === "Approved").length,
    rejected: projectList.filter((p) => p.status === "Rejected").length,
  };

  // load saved teacher profiles from localStorage so admin can see teacher count
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem("teachers");
        const arr = raw ? JSON.parse(raw) : [];
        setTeachers(arr);
      } catch (err) {
        setTeachers([]);
      }
    };

    load();

    const onStorage = (e) => {
      if (e.key === "teachers") {
        load();
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a103d] p-4 md:p-10 font-sans text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase">
              Admin Control Panel
            </h1>
            <p className="text-indigo-300 mt-2 text-lg">
              Review and finalize project assignments
            </p>
          </div>
          <div className="bg-indigo-500/20 border border-indigo-500/40 px-6 py-3 rounded-2xl text-sm flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="font-bold tracking-widest">SYSTEM ACTIVE</span>
          </div>
        </div>

        {/* Faculty Overview (Admin) */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <div className="md:col-span-1 bg-[#2d1b69] p-5 rounded-2xl border border-indigo-500/30">
            <p className="text-sm uppercase text-indigo-300 font-black tracking-widest">
              Total Teachers
            </p>
            <p className="text-3xl font-black mt-2">{teachers.length}</p>
          </div>

          <div className="md:col-span-2 bg-[#211041] p-5 rounded-2xl border border-white/5">
            <p className="text-sm text-indigo-300 font-black mb-3 uppercase tracking-widest">
              Recent / Registered Teachers
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {teachers && teachers.length ? (
                teachers.slice(0, 6).map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-[#2b184f] p-3 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-800 flex-shrink-0">
                      {t.profileImg ? (
                        <img
                          src={t.profileImg}
                          alt={t.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm font-black text-indigo-200">
                          {t.name ? t.name[0] : "?"}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-black text-sm">{t.name}</div>
                      <div className="text-xs text-indigo-300">
                        {t.designation}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-indigo-300">
                  No teacher profiles saved.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- STATS CARDS SECTION --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Projects */}
          <div className="bg-[#2d1b69] border-b-4 border-indigo-500 p-6 rounded-[2rem] shadow-xl hover:translate-y-[-5px] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase text-indigo-300 tracking-widest">
                  Total Projects
                </p>
                <p className="text-4xl font-black mt-1">{stats.total}</p>
              </div>
              <ListChecks className="text-indigo-400" size={40} />
            </div>
          </div>

          {/* Pending */}
          <div className="bg-[#2d1b69] border-b-4 border-yellow-400 p-6 rounded-[2rem] shadow-xl hover:translate-y-[-5px] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase text-yellow-300 tracking-widest">
                  Admin Pending
                </p>
                <p className="text-4xl font-black mt-1 text-yellow-400">
                  {stats.pending}
                </p>
              </div>
              <Hourglass className="text-yellow-400" size={40} />
            </div>
          </div>

          {/* Approved */}
          <div className="bg-[#2d1b69] border-b-4 border-green-500 p-6 rounded-[2rem] shadow-xl hover:translate-y-[-5px] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase text-green-300 tracking-widest">
                  Final Approved
                </p>
                <p className="text-4xl font-black mt-1 text-green-400">
                  {stats.approved}
                </p>
              </div>
              <CheckSquare className="text-green-400" size={40} />
            </div>
          </div>

          {/* Rejected */}
          <div className="bg-[#2d1b69] border-b-4 border-red-500 p-6 rounded-[2rem] shadow-xl hover:translate-y-[-5px] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase text-red-300 tracking-widest">
                  Rejected
                </p>
                <p className="text-4xl font-black mt-1 text-red-400">
                  {stats.rejected}
                </p>
              </div>
              <XSquare className="text-red-400" size={40} />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-[#2d1b69]/50 backdrop-blur-md p-5 rounded-[2rem] border border-white/10 flex flex-col md:flex-row gap-4 mb-8 shadow-2xl">
          <div className="relative flex-1 group">
            <Search
              className="absolute left-4 top-4 text-indigo-400 group-focus-within:text-yellow-400"
              size={24}
            />
            <input
              type="text"
              placeholder="Search student or project title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1a103d] text-white text-lg border border-indigo-500/30 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-yellow-400/20 transition-all"
            />
          </div>
          <button
            onClick={() => setSearchTerm("")}
            className="bg-yellow-400 hover:bg-yellow-500 text-[#1a103d] font-black py-4 px-10 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-yellow-400/20"
          >
            <RotateCcw size={20} /> RESET
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100 text-indigo-900 uppercase text-sm font-black tracking-widest border-b-2">
                  <th className="px-8 py-7 text-center">S.No.</th>
                  <th className="px-6 py-7">Student & Project</th>
                  <th className="px-6 py-7 text-center">Teacher Verdict</th>
                  <th className="px-6 py-7 text-center">Admin Status</th>
                  <th className="px-6 py-7 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-50">
                {filteredProjects.map((proj, index) => {
                  const isTeacherApproved = proj.teacherStatus === "Approved";

                  return (
                    <tr
                      key={proj.id}
                      className="hover:bg-indigo-50/60 transition-colors group"
                    >
                      <td className="px-8 py-6 text-center font-black text-gray-300 text-xl">
                        {index + 1}
                      </td>
                      <td className="px-6 py-6 text-gray-800">
                        <div className="font-black text-lg uppercase tracking-tight">
                          {proj.student}
                        </div>
                        <div className="text-indigo-600 font-bold italic">
                          "{proj.title}"
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border-2 ${
                            proj.teacherStatus === "Approved"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : proj.teacherStatus === "Rejected"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-gray-100 text-gray-500 border-gray-300"
                          }`}
                        >
                          <div
                            className={`h-2.5 w-2.5 rounded-full ${proj.teacherStatus === "Approved" ? "bg-blue-600 animate-pulse" : "bg-current"}`}
                          ></div>
                          {proj.teacherStatus}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span
                          className={`inline-block min-w-[140px] px-6 py-3 rounded-2xl text-[13px] font-black uppercase tracking-widest shadow-lg ${
                            proj.status === "Approved"
                              ? "bg-green-500 text-white"
                              : proj.status === "Rejected"
                                ? "bg-red-500 text-white"
                                : "bg-yellow-400 text-gray-900"
                          }`}
                        >
                          {proj.status}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            disabled={!isTeacherApproved}
                            onClick={() =>
                              handleStatusUpdate(proj.id, "Approved")
                            }
                            className={`p-3 rounded-xl transition-all shadow-lg ${isTeacherApproved ? "bg-green-600 text-white hover:scale-110" : "bg-gray-200 text-gray-400"}`}
                          >
                            <CheckCircle size={22} />
                          </button>
                          <button
                            disabled={!isTeacherApproved}
                            onClick={() =>
                              handleStatusUpdate(proj.id, "Rejected")
                            }
                            className={`p-3 rounded-xl transition-all shadow-lg ${isTeacherApproved ? "bg-red-600 text-white hover:scale-110" : "bg-gray-200 text-gray-400"}`}
                          >
                            <XCircle size={22} />
                          </button>
                          <button className="p-3 bg-indigo-600 text-white rounded-xl hover:scale-110 shadow-lg shadow-indigo-600/20">
                            <Eye size={22} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
