import React, { useState, useRef } from "react";

const Form = () => {
  const [form, setForm] = useState({
    program: "",
    programOther: "",
    date: "",
    teamSize: 1,
    students: [
      { name: "", classNo: "", reg: "" },
      { name: "", classNo: "", reg: "" },
      { name: "", classNo: "", reg: "" },
    ],
    contactPhone: "",
    topic: "",
    organization: "",
    advisor: "",
    advisorOther: "",
  });

  const printRef = useRef(null);

  const handleChange = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((s) => ({ ...s, [key]: value }));
  };

  const handleStudentChange = (index, field, value) => {
    setForm((s) => {
      const students = Array.isArray(s.students) ? [...s.students] : [];
      students[index] = { ...students[index], [field]: value };
      return { ...s, students };
    });
  };

  const handleTeamSizeChange = (n) => {
    const size = Math.max(1, Math.min(3, Number(n)));
    setForm((s) => ({ ...s, teamSize: size }));
  };

  // PDF Download Logic - Sirf Form Area Capture Hoga
  const handleDownload = async () => {
    if (!printRef.current) return;
    try {
      const [html2canvasMod, jspdfMod] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const html2canvas = html2canvasMod.default || html2canvasMod;
      const jsPDF = jspdfMod.jsPDF || jspdfMod.default || jspdfMod;

      const element = printRef.current;
      
      // Scale 2 se quality achi aati hai
      const canvas = await html2canvas(element, { 
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff" // Background white rakhega
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ unit: "mm", format: "a4" });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Project-Form-${form.students[0].name || "UAP"}.pdf`);
    } catch (err) {
      console.error("PDF download failed:", err);
    }
  };

  return (
    <div className="bg-gray-100 p-4 md:p-8 min-h-screen flex flex-col items-center pt-24">
      
      {/* Action Button - Ye PDF mein nahi aayega */}
      <div className="w-full max-w-[850px] flex justify-end mb-4">
        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow-md font-bold transition flex items-center gap-2"
        >
          <span>📥</span> Download Official PDF
        </button>
      </div>

      {/* Form Area - Sirf ye hissa PDF banega */}
      <div 
        ref={printRef} 
        className="bg-white w-full max-w-[850px] p-8 md:p-16 text-gray-900 font-serif leading-tight border border-gray-200"
        style={{ minHeight: "297mm" }} // A4 height ensure karne ke liye
      >
        {/* University Header */}
        <div className="text-center border-b-2 border-black pb-4 mb-8">
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tighter">
            The University of Agriculture, Peshawar
          </h2>
          <h3 className="text-md md:text-lg font-semibold uppercase">
            KHYBER PAKHTUNKHWA PAKISTAN
          </h3>
          <p className="text-[10px] italic mt-1">
            Phone: +92-91-9221262 | Fax: +92-91-9221262
          </p>

          <div className="mt-6 border-2 border-black inline-block px-10 py-2">
            <h1 className="text-lg md:text-xl font-black tracking-[0.2em] uppercase">
              Project Approval Sheet
            </h1>
          </div>
        </div>

        {/* Program and Date */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
          <div className="flex items-center gap-2 border-b border-black pb-1">
            <span className="font-bold">Program:</span>
            <select value={form.program} onChange={handleChange("program")} className="bg-transparent outline-none cursor-pointer">
              <option value="">Select Program</option>
              <option value="BS(CS)">BS(CS)</option>
              <option value="BS(IT)">BS(IT)</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex items-center gap-6">
            <div className="border-b border-black pb-1">
               <span className="font-bold">Team Size:</span>
               <select value={form.teamSize} onChange={(e) => handleTeamSizeChange(e.target.value)} className="bg-transparent outline-none ml-2">
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
               </select>
            </div>
            <div className="border-b border-black pb-1">
               <span className="font-bold">Date:</span>
               <input type="date" value={form.date} onChange={handleChange("date")} className="bg-transparent outline-none ml-2" />
            </div>
          </div>
        </div>

        {/* Students Details */}
        <div className="space-y-8 mb-10">
          {form.students.slice(0, form.teamSize).map((stu, idx) => (
            <div key={idx} className="flex flex-col md:grid md:grid-cols-12 gap-2 border-b border-dotted border-black pb-1">
              <span className="md:col-span-3 font-bold uppercase text-sm">Student's Name:</span>
              <input className="md:col-span-4 italic outline-none bg-transparent" value={stu.name} onChange={(e) => handleStudentChange(idx, "name", e.target.value)} />
              <span className="md:col-span-2 font-bold md:text-right text-sm">Class No:</span>
              <input className="md:col-span-1 italic outline-none bg-transparent" value={stu.classNo} onChange={(e) => handleStudentChange(idx, "classNo", e.target.value)} />
              <span className="md:col-span-1 font-bold md:text-right text-sm">Reg:</span>
              <input className="md:col-span-1 italic outline-none bg-transparent text-xs" value={stu.reg} onChange={(e) => handleStudentChange(idx, "reg", e.target.value)} />
            </div>
          ))}
        </div>

        {/* Project Topic */}
        <div className="mb-10">
          <label className="font-bold uppercase text-sm">Project Topic:</label>
          <textarea
            value={form.topic}
            onChange={handleChange("topic")}
            rows="2"
            className="w-full border-b border-dotted border-black outline-none italic mt-2 bg-transparent resize-none leading-relaxed"
            placeholder="Write your topic here..."
          />
        </div>

        {/* Advisor and Org */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div className="border-b border-dotted border-black pb-1 flex gap-2">
            <span className="font-bold text-sm">Organization:</span>
            <input className="flex-1 outline-none italic" value={form.organization} onChange={handleChange("organization")} />
          </div>
          <div className="border-b border-black pb-1 flex gap-2">
            <span className="font-bold text-sm">Advisor:</span>
            <select value={form.advisor} onChange={handleChange("advisor")} className="flex-1 bg-transparent outline-none">
              <option value="">Choose Advisor</option>
              <option value="Adnan Haroon">Adnan Haroon</option>
              <option value="Dr. Ali">Dr. Ali</option>
              <option value="Prof. Sana">Prof. Sana</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Phone */}
        <div className="mb-16 border-b border-dotted border-black inline-block pb-1">
          <span className="font-bold text-sm">Contact Phone:</span>
          <input className="outline-none italic ml-3 w-48" value={form.contactPhone} onChange={handleChange("contactPhone")} />
        </div>

        {/* Signature Grid */}
        <div className="grid grid-cols-2 gap-24 mb-16">
          <div className="text-center border-t border-black pt-2">
            <p className="italic text-sm">Student's Signature</p>
            <p className="text-[10px] mt-1">Cell: {form.contactPhone || "___________"}</p>
          </div>
          <div className="text-center">
             <p className="font-bold underline min-h-[20px] mb-1">
               {form.advisor === "Other" ? form.advisorOther : form.advisor}
             </p>
             <div className="border-t border-black pt-2 italic text-sm">Advisor's Name</div>
          </div>
        </div>

        {/* Office Box */}
        <div className="border-2 border-black p-6 bg-gray-50/20">
          <p className="text-center font-bold underline italic uppercase mb-6">For Office Use Only</p>
          <div className="grid grid-cols-2 gap-y-8 gap-x-12 text-sm">
            <div className="border-b border-black">Starting Date: ____________</div>
            <div className="border-b border-black">Submission Date: ____________</div>
            <div className="border-b border-black h-8 flex items-end">Advisor Sign:</div>
            <div className="border-b border-black h-8 flex items-end">Dept. Head:</div>
            <div className="border-b border-black h-8 flex items-end">Member Sign:</div>
            <div className="border-b border-black h-8 flex items-end">Director Sign:</div>
          </div>
        </div>

        <p className="mt-10 text-[9px] text-center text-gray-400 uppercase tracking-widest">
          University Academic Record Copy - 2026
        </p>
      </div>
    </div>
  );
};

export default Form;