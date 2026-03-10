import React, { useState } from "react";

const initialRequests = [
  {
    id: 1,
    teamLeader: "Maaz Khan",
    regNo: "UAP-2022-CS-123",
    topic: "AI-Powered Plant Disease Detection System",
    teamSize: 3,
    submissionDate: "15 Jan 2026",
    program: "BS(CS)",
    organization: "Agriculture Dept, Peshawar",
    contactPhone: "0344-1234567",
    status: "Pending",
  },
  {
    id: 2,
    teamLeader: "Sara Javed",
    regNo: "UAP-2022-IT-456",
    topic: "Blockchain-based Student Record Management",
    teamSize: 2,
    submissionDate: "14 Jan 2026",
    program: "BS(IT)",
    organization: "UAP IT Center",
    contactPhone: "0311-9876543",
    status: "Pending",
  }
];

const TeacherDash = () => {
  const [requests, setRequests] = useState(initialRequests); // Ye Pending list hai
  const [approvedProjects, setApprovedProjects] = useState([]); 
  const [rejectedCount, setRejectedCount] = useState(0); 
  const [viewPanel, setViewPanel] = useState(null);

  // Stats Logic
  const stats = {
    total: requests.length + approvedProjects.length + rejectedCount,
    pending: requests.length,
    approved: approvedProjects.length,
    rejected: rejectedCount
  };

  const handleAction = (id, action) => {
    const selectedProject = requests.find(req => req.id === id);

    if (action === 'approved') {
      setApprovedProjects([...approvedProjects, { ...selectedProject, status: 'Approved' }]);
    } else if (action === 'rejected') {
      setRejectedCount(prev => prev + 1);
    }

    setRequests(requests.filter((req) => req.id !== id));
    setViewPanel(null);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] pb-20 p-4 md:p-10 font-sans text-[#002147] pt-28">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="text-center md:text-left">
             <h1 className="text-4xl font-black uppercase italic tracking-tighter">
               Mentor <span className="text-yellow-500">Dashboard</span>
             </h1>
             <p className="text-gray-500 font-bold">Manage Student Final Year Proposals</p>
           </div>
        </div>

        {/* --- 4 UNIQUE STATS CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* TOTAL */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-b-8 border-indigo-600 transform hover:-translate-y-2 transition-all">
            <p className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Total Received</p>
            <p className="text-4xl font-black mt-2">{stats.total}</p>
          </div>

          {/* PENDING */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-b-8 border-yellow-400 transform hover:-translate-y-2 transition-all">
            <p className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Pending Review</p>
            <p className="text-4xl font-black mt-2 text-yellow-600">{stats.pending}</p>
          </div>

          {/* APPROVED */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-b-8 border-green-500 transform hover:-translate-y-2 transition-all">
            <p className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Approved</p>
            <p className="text-4xl font-black mt-2 text-green-600">{stats.approved}</p>
          </div>

          {/* REJECTED */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-b-8 border-red-500 transform hover:-translate-y-2 transition-all">
            <p className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Rejected</p>
            <p className="text-4xl font-black mt-2 text-red-600">{stats.rejected}</p>
          </div>
        </div>

        {/* --- Pending Proposals Section --- */}
        <div className="mb-16">
          <h2 className="text-2xl font-black uppercase italic mb-8 flex items-center gap-3">
            <span className="bg-[#002147] w-3 h-8 rounded-full"></span>
            Pending Proposals
          </h2>
          
          {requests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {requests.map((req) => (
                <div key={req.id} className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-gray-100 flex flex-col hover:shadow-2xl transition-all duration-500">
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-16 w-16 bg-[#002147] rounded-3xl flex items-center justify-center text-white text-2xl font-black shadow-lg">{req.teamLeader[0]}</div>
                    <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">{req.submissionDate}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-1 text-[#002147]">{req.teamLeader}</h3>
                  <p className="text-xs font-bold text-indigo-500 mb-6">{req.regNo}</p>
                  <div className="bg-gray-50 p-5 rounded-2xl mb-8 italic text-sm text-gray-600 border-l-8 border-yellow-400 font-medium">
                    "{req.topic}"
                  </div>
                  <div className="flex flex-col gap-3 mt-auto">
                    <button onClick={() => setViewPanel(req)} className="w-full py-4 bg-gray-100 text-[#002147] rounded-2xl font-black text-xs uppercase hover:bg-indigo-600 hover:text-white transition-all shadow-md">
                      🔍 Full Details
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => handleAction(req.id, 'rejected')} className="py-4 text-red-600 font-black text-xs uppercase border-2 border-red-50 rounded-2xl hover:bg-red-50">Reject</button>
                      <button onClick={() => handleAction(req.id, 'approved')} className="py-4 bg-green-500 text-white font-black text-xs uppercase rounded-2xl shadow-lg shadow-green-100 hover:bg-green-600">Approve</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-20 bg-white rounded-[3rem] border-4 border-dashed border-gray-100 text-gray-300 font-black text-2xl italic uppercase tracking-widest">
              No Pending Work!
            </div>
          )}
        </div>

        {/* --- Approved / Supervised Groups --- */}
        {approvedProjects.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-black uppercase italic mb-8 flex items-center gap-3 text-green-700">
              <span className="bg-green-500 w-3 h-8 rounded-full"></span>
              Supervised Groups
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {approvedProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-[2.5rem] p-8 border-2 border-green-50 shadow-sm relative group overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-green-500"></div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-black text-green-900 uppercase">{project.teamLeader}</h3>
                    <div className="h-8 w-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
                  </div>
                  <p className="text-xs font-bold text-green-600 mb-6 font-mono tracking-tighter">{project.regNo}</p>
                  <p className="text-sm italic text-gray-700 leading-relaxed font-medium">"{project.topic}"</p>
                  <div className="mt-8 pt-6 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{project.program}</span>
                    <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-[10px] font-black uppercase">Active Supervision</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      
      {/* Side Panel and Styles are same as before... */}
    </div>
  );
};

export default TeacherDash;