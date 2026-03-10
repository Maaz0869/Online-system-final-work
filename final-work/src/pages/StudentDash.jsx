import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const StudentDash = () => {
  const applications = [
    {
      id: 1,
      type: "Final Year Project Proposal",
      date: "12 Jan 2026",
      status: "Approved",
      statusColor: "text-green-600 bg-green-100",
    },
    {
      id: 2,
      type: "Mentor Change Request",
      date: "10 Jan 2026",
      status: "Pending",
      statusColor: "text-yellow-600 bg-yellow-100",
    },
  ];

  // Function to download simple PDF status
  const handleDownloadStatus = (app) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("University of Agriculture, Peshawar", 20, 20);
    doc.setFontSize(14);
    doc.text(`Application Status Report`, 20, 40);
    doc.text(`-------------------------`, 20, 45);
    doc.text(`Type: ${app.type}`, 20, 60);
    doc.text(`Date: ${app.date}`, 20, 70);
    doc.text(`Status: ${app.status}`, 20, 80);
    doc.save(`${app.type}-Status.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-12 p-4 md:p-12 font-sans text-[#002147] pt-24">
      <div className="max-w-6xl mx-auto">
        
        {/* --- Simple Welcome Message --- */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Welcome <span className="text-blue-600">Maaz Khan!</span>
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Here are your recent applications and their status.
          </p>
          <div className="w-20 h-1.5 bg-blue-600 mt-3 rounded-full mx-auto md:mx-0"></div>
        </div>

        {/* --- Table Section --- */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 bg-gray-50/50">
            <h2 className="text-lg font-bold flex items-center gap-2 justify-center md:justify-start">
              <span className="text-blue-600 text-xl">📝</span>
              My Applications
            </h2>
          </div>

          {/* Table for Desktop, Cards for Mobile */}
          <div className="overflow-x-auto">
            {/* Desktop View */}
            <table className="hidden md:table w-full text-left">
              <thead>
                <tr className="text-gray-400 text-[11px] uppercase tracking-widest border-b">
                  <th className="px-8 py-5 font-bold">Application Type</th>
                  <th className="px-8 py-5 font-bold">Date</th>
                  <th className="px-8 py-5 font-bold">Status</th>
                  <th className="px-8 py-5 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-blue-50/20 transition-all">
                    <td className="px-8 py-6 font-semibold text-gray-700">{app.type}</td>
                    <td className="px-8 py-6 text-gray-500">{app.date}</td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold inline-flex items-center gap-2 ${app.statusColor}`}>
                        {app.status === "Approved" ? "✅" : "⏳"} {app.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <button 
                        onClick={() => handleDownloadStatus(app)}
                        className="bg-white border border-gray-200 text-gray-600 hover:bg-[#002147] hover:text-white px-4 py-2 rounded-xl transition-all font-bold text-xs flex items-center gap-2 mx-auto"
                      >
                        <span>⬇️</span> Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile View (Cards) */}
            <div className="md:hidden divide-y divide-gray-100">
              {applications.map((app) => (
                <div key={app.id} className="p-6 space-y-4">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Type</p>
                    <p className="font-bold text-gray-800">{app.type}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Date</p>
                      <p className="text-sm text-gray-600">{app.date}</p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${app.statusColor}`}>
                        {app.status === "Approved" ? "✅" : "⏳"} {app.status}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDownloadStatus(app)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 rounded-xl font-bold text-xs flex justify-center items-center gap-2 active:bg-gray-200 transition"
                  >
                    <span>⬇️</span> Download Report
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDash;