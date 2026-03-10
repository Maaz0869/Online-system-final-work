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
  const [requests, setRequests] = useState(initialRequests);
  const [approvedProjects, setApprovedProjects] = useState([]); // Approved projects ke liye naya state
  const [viewPanel, setViewPanel] = useState(null);

  const handleAction = (id, action) => {
    const selectedProject = requests.find(req => req.id === id);

    if (action === 'approved') {
      // Approve hone par projects list mein add karo
      setApprovedProjects([...approvedProjects, { ...selectedProject, status: 'Approved' }]);
    }

    // Pending list se hata do
    setRequests(requests.filter((req) => req.id !== id));
    setViewPanel(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 p-4 md:p-10 font-sans text-[#002147] pt-28">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section with Stats --- */}
        <div className="relative mb-12 p-8 rounded-[2.5rem] bg-gradient-to-r from-[#002147] to-[#053d7a] text-white shadow-2xl overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight italic">
                Mentor <span className="text-yellow-400">Control Center</span>
              </h1>
              <p className="text-blue-100 mt-2 opacity-80">Manage your pending and approved project groups.</p>
            </div>
            
            {/* Dual Stats */}
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/20 text-center">
                <p className="text-3xl font-bold text-yellow-400">{requests.length}</p>
                <p className="text-[10px] uppercase font-black text-blue-100">Pending</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/20 text-center">
                <p className="text-3xl font-bold text-green-400">{approvedProjects.length}</p>
                <p className="text-[10px] uppercase font-black text-blue-100">Approved</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Pending Requests Section --- */}
        <div className="mb-16">
          <h2 className="text-2xl font-black uppercase italic mb-8 flex items-center gap-3">
            <span className="bg-yellow-400 w-2 h-8 rounded-full"></span>
            Pending Requests
          </h2>
          
          {requests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {requests.map((req) => (
                <div key={req.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-all duration-500">
                   <div className="flex justify-between items-start mb-6">
                    <div className="h-14 w-14 bg-[#002147] rounded-2xl flex items-center justify-center text-white text-xl font-bold">{req.teamLeader[0]}</div>
                    <span className="text-[10px] font-black uppercase text-gray-400">{req.submissionDate}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-1">{req.teamLeader}</h3>
                  <div className="bg-gray-50 p-4 rounded-2xl mb-6 italic text-sm text-gray-600 border-l-4 border-yellow-400">"{req.topic}"</div>
                  <button onClick={() => setViewPanel(req)} className="w-full py-3 mb-4 bg-gray-100 text-[#002147] rounded-xl font-black text-xs uppercase hover:bg-[#002147] hover:text-white transition-all">🔍 View Details</button>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => handleAction(req.id, 'rejected')} className="py-3 text-red-500 font-bold text-xs border border-red-100 rounded-xl hover:bg-red-50">Reject</button>
                    <button onClick={() => handleAction(req.id, 'approved')} className="py-3 bg-green-500 text-white font-bold text-xs rounded-xl">Approve</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-10 bg-white rounded-3xl border border-dashed border-gray-300 text-gray-400 font-bold italic">No pending requests!</div>
          )}
        </div>

        {/* --- Approved Projects Section (The New Part) --- */}
        {approvedProjects.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-black uppercase italic mb-8 flex items-center gap-3 text-green-700">
              <span className="bg-green-500 w-2 h-8 rounded-full"></span>
              My Supervised Groups
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {approvedProjects.map((project) => (
                <div key={project.id} className="bg-green-50/50 rounded-[2.5rem] p-8 border-2 border-green-100 relative overflow-hidden group">
                  <div className="absolute top-4 right-4 text-green-500 text-xl font-bold">✅</div>
                  <h3 className="text-xl font-black text-green-900 mb-2">{project.teamLeader}</h3>
                  <p className="text-xs font-bold text-green-600 mb-4 font-mono">{project.regNo}</p>
                  <p className="text-sm italic text-gray-700 leading-relaxed">"{project.topic}"</p>
                  <div className="mt-6 flex justify-between items-center text-[10px] font-black text-green-800 uppercase">
                    <span>{project.program}</span>
                    <span className="bg-green-200 px-3 py-1 rounded-full">Approved</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- Side Panel for View Details --- */}
        {viewPanel && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <div className="absolute inset-0 bg-[#002147]/40 backdrop-blur-sm" onClick={() => setViewPanel(null)}></div>
            <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col animate-slide-in">
               <div className="p-6 border-b flex justify-between items-center bg-[#002147] text-white">
                <h2 className="text-xl font-black uppercase italic">Proposal Details</h2>
                <button onClick={() => setViewPanel(null)} className="text-3xl">&times;</button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 font-serif">
                <div className="text-center border-b-4 border-double border-black pb-4 mb-8">
                  <h3 className="font-bold text-lg uppercase">University of Agriculture, Peshawar</h3>
                </div>
                <div className="space-y-6 text-gray-800">
                  <p><span className="font-bold block text-[10px] uppercase text-gray-400">Project Title</span><span className="text-xl font-bold italic">"{viewPanel.topic}"</span></p>
                  <p><span className="font-bold block text-[10px] uppercase text-gray-400">Team Leader</span><span className="font-bold">{viewPanel.teamLeader} ({viewPanel.regNo})</span></p>
                  <p><span className="font-bold block text-[10px] uppercase text-gray-400">Contact</span><span>{viewPanel.contactPhone}</span></p>
                </div>
                <div className="mt-20 flex flex-col gap-3 font-sans">
                  <button onClick={() => handleAction(viewPanel.id, 'approved')} className="w-full py-4 bg-green-600 text-white rounded-2xl font-black uppercase shadow-lg hover:bg-green-700 transition">Approve Proposal</button>
                  <button onClick={() => handleAction(viewPanel.id, 'rejected')} className="w-full py-4 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition">Decline Request</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-slide-in { animation: slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
};

export default TeacherDash;