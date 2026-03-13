import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (key) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((s) => ({ ...s, [key]: value }));
  };

  const handleStudentChange = (index, field, value) => {
    setForm((s) => {
      const students = Array.isArray(s.students) ? [...s.students] : [];
      students[index] = { ...students[index], [field]: value };
      return { ...s, students };
    });
  };

  const regValid = (reg) => {
    if (!reg) return false;
    // allow letters, numbers, hyphen, slash; length 5-20
    return /^[A-Za-z0-9\-\/]{5,20}$/.test(reg);
  };

  const phoneValid = (p) => {
    if (!p) return false;
    // digits, spaces, +, - allowed, min 7
    return /^[0-9+\-\s]{7,20}$/.test(p);
  };

  const validate = () => {
    const e = {};
    if (!form.program) e.program = "Program is required";
    if (!form.date) e.date = "Date is required";
    if (!form.topic) e.topic = "Project topic is required";
    if (!form.organization) e.organization = "Organization is required";
    if (!form.advisor) e.advisor = "Advisor is required";
    if (!form.contactPhone || !phoneValid(form.contactPhone))
      e.contactPhone = "Enter a valid phone number";

    const students = form.students.slice(0, form.teamSize);
    students.forEach((stu, idx) => {
      if (!stu.name || !stu.name.trim())
        e[`student_${idx}_name`] = "Student name is required";
      if (!stu.classNo || !stu.classNo.trim())
        e[`student_${idx}_classNo`] = "Class No is required";
      if (!stu.reg || !regValid(stu.reg))
        e[`student_${idx}_reg`] = "Enter a valid Reg No (5-20 alphanumeric)";
    });

    // update the state for UI, and also return the error object so callers
    // can act on it immediately (avoid reading stale `errors` state)
    setErrors(e);
    return e;
  };

  const isFormValid = () => {
    if (
      !form.program ||
      !form.date ||
      !form.topic ||
      !form.organization ||
      !form.advisor
    )
      return false;
    if (!phoneValid(form.contactPhone)) return false;
    const students = form.students.slice(0, form.teamSize);
    for (let stu of students) {
      if (!stu.name || !stu.classNo || !regValid(stu.reg)) return false;
    }
    return true;
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
        backgroundColor: "#ffffff", // Background white rakhega
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

  // Submit the form and add an application entry to the dashboard
  const handleSubmit = (e) => {
    // If called from a button without form, accept undefined event
    if (e && e.preventDefault) e.preventDefault();

    // run validation and abort if invalid. Use the returned errors object so
    // we don't rely on the asynchronous state update of `errors`.
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      const firstKey = Object.keys(validationErrors)[0];
      const el = document.querySelector(`[data-errkey="${firstKey}"]`);
      if (el && typeof el.scrollIntoView === "function")
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const newApp = {
      id: Date.now(),
      type: form.topic || "Project Submission",
      date: form.date || new Date().toLocaleDateString(),
      status: "Pending",
      statusColor: "text-yellow-600 bg-yellow-100",
    };

    try {
      const raw = localStorage.getItem("applications");
      const arr = raw ? JSON.parse(raw) : [];
      // add newest at top
      arr.unshift(newApp);
      localStorage.setItem("applications", JSON.stringify(arr));
    } catch (err) {
      console.error("Saving application failed", err);
    }

    // navigate to dashboard so user sees the added application
    navigate("/dashboard");
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
      <form onSubmit={handleSubmit} className="w-full flex justify-center">
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
              <select
                value={form.program}
                onChange={handleChange("program")}
                className="bg-transparent outline-none cursor-pointer"
                required
                aria-required="true"
                data-errkey="program"
              >
                <option value="">Select Program</option>
                <option value="BS(CS)">BS(CS)</option>
                <option value="BS(IT)">BS(IT)</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex items-center gap-6">
              <div className="border-b border-black pb-1">
                <span className="font-bold">Team Size:</span>
                <select
                  value={form.teamSize}
                  onChange={(e) => handleTeamSizeChange(e.target.value)}
                  className="bg-transparent outline-none ml-2"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>
              <div className="border-b border-black pb-1">
                <span className="font-bold">Date:</span>
                <input
                  type="date"
                  value={form.date}
                  onChange={handleChange("date")}
                  className="bg-transparent outline-none ml-2"
                  required
                  aria-required="true"
                  data-errkey="date"
                />
              </div>
            </div>
          </div>

          {/* Students Details */}
          <div className="space-y-8 mb-10">
            {form.students.slice(0, form.teamSize).map((stu, idx) => (
              <div
                key={idx}
                className="flex flex-col md:grid md:grid-cols-12 gap-2 border-b border-dotted border-black pb-1"
              >
                <span className="md:col-span-3 font-bold uppercase text-sm">
                  Student's Name:
                </span>
                <input
                  className="md:col-span-4 italic outline-none bg-transparent"
                  value={stu.name}
                  onChange={(e) =>
                    handleStudentChange(idx, "name", e.target.value)
                  }
                  required
                  aria-required="true"
                  data-errkey={`student_${idx}_name`}
                />
                {errors[`student_${idx}_name`] && (
                  <div
                    className="text-red-600 text-xs col-start-2 col-span-11 mt-1"
                    data-errkey={`student_${idx}_name`}
                  >
                    {errors[`student_${idx}_name`]}
                  </div>
                )}
                <span className="md:col-span-2 font-bold md:text-right text-sm">
                  Class No:
                </span>
                <input
                  className="md:col-span-1 italic outline-none bg-transparent"
                  value={stu.classNo}
                  onChange={(e) =>
                    handleStudentChange(idx, "classNo", e.target.value)
                  }
                  required
                  aria-required="true"
                  data-errkey={`student_${idx}_classNo`}
                />
                {errors[`student_${idx}_classNo`] && (
                  <div
                    className="text-red-600 text-xs col-start-4 col-span-9 mt-1"
                    data-errkey={`student_${idx}_classNo`}
                  >
                    {errors[`student_${idx}_classNo`]}
                  </div>
                )}
                <span className="md:col-span-1 font-bold md:text-right text-sm">
                  Reg:
                </span>
                <input
                  className="md:col-span-1 italic outline-none bg-transparent text-xs"
                  value={stu.reg}
                  onChange={(e) =>
                    handleStudentChange(idx, "reg", e.target.value)
                  }
                  required
                  aria-required="true"
                  data-errkey={`student_${idx}_reg`}
                  pattern="[A-Za-z0-9\-\/]{5,20}"
                  title="Reg No: 5-20 characters, letters, numbers, - or / allowed"
                />
                {errors[`student_${idx}_reg`] && (
                  <div
                    className="text-red-600 text-xs col-start-12 col-span-1 mt-1"
                    data-errkey={`student_${idx}_reg`}
                  >
                    {errors[`student_${idx}_reg`]}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Project Topic */}
          <div className="mb-10">
            <label className="font-bold uppercase text-sm">
              Project Topic:
            </label>
            <textarea
              value={form.topic}
              onChange={handleChange("topic")}
              rows="2"
              className="w-full border-b border-dotted border-black outline-none italic mt-2 bg-transparent resize-none leading-relaxed"
              placeholder="Write your topic here..."
              required
              aria-required="true"
              data-errkey="topic"
            />
            {errors.topic && (
              <div className="text-red-600 text-xs mt-1" data-errkey="topic">
                {errors.topic}
              </div>
            )}
          </div>

          {/* Advisor and Org */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <div className="border-b border-dotted border-black pb-1 flex gap-2">
              <span className="font-bold text-sm">Organization:</span>
              <input
                className="flex-1 outline-none italic"
                value={form.organization}
                onChange={handleChange("organization")}
                required
                aria-required="true"
                data-errkey="organization"
              />
              {errors.organization && (
                <div
                  className="text-red-600 text-xs mt-1"
                  data-errkey="organization"
                >
                  {errors.organization}
                </div>
              )}
            </div>
            <div className="border-b border-black pb-1 flex gap-2">
              <span className="font-bold text-sm">Advisor:</span>
              <select
                value={form.advisor}
                onChange={handleChange("advisor")}
                className="flex-1 bg-transparent outline-none"
                required
                aria-required="true"
                data-errkey="advisor"
              >
                <option value="">Choose Advisor</option>
                <option value="Adnan Haroon">Adnan Haroon</option>
                <option value="Dr. Ali">Dr. Ali</option>
                <option value="Prof. Sana">Prof. Sana</option>
                <option value="Other">Other</option>
              </select>
              {errors.advisor && (
                <div
                  className="text-red-600 text-xs mt-1"
                  data-errkey="advisor"
                >
                  {errors.advisor}
                </div>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="mb-16 border-b border-dotted border-black inline-block pb-1">
            <span className="font-bold text-sm">Contact Phone:</span>
            <input
              className="outline-none italic ml-3 w-48"
              value={form.contactPhone}
              onChange={handleChange("contactPhone")}
              required
              aria-required="true"
              data-errkey="contactPhone"
              pattern="[0-9+\-\s]{7,20}"
              title="Enter a valid phone number (7-20 digits, +, - or spaces allowed)"
            />
            {errors.contactPhone && (
              <div
                className="text-red-600 text-xs mt-1"
                data-errkey="contactPhone"
              >
                {errors.contactPhone}
              </div>
            )}
          </div>

          {/* Signature Grid */}
          <div className="grid grid-cols-2 gap-24 mb-16">
            <div className="text-center border-t border-black pt-2">
              <p className="italic text-sm">Student's Signature</p>
              <p className="text-[10px] mt-1">
                Cell: {form.contactPhone || "___________"}
              </p>
            </div>
            <div className="text-center">
              <p className="font-bold underline min-h-[20px] mb-1">
                {form.advisor === "Other" ? form.advisorOther : form.advisor}
              </p>
              <div className="border-t border-black pt-2 italic text-sm">
                Advisor's Name
              </div>
            </div>
          </div>

          {/* Office Box */}
          <div className="border-2 border-black p-6 bg-gray-50/20">
            <p className="text-center font-bold underline italic uppercase mb-6">
              For Office Use Only
            </p>
            <div className="grid grid-cols-2 gap-y-8 gap-x-12 text-sm">
              <div className="border-b border-black">
                Starting Date: ____________
              </div>
              <div className="border-b border-black">
                Submission Date: ____________
              </div>
              <div className="border-b border-black h-8 flex items-end">
                Advisor Sign:
              </div>
              <div className="border-b border-black h-8 flex items-end">
                Dept. Head:
              </div>
              <div className="border-b border-black h-8 flex items-end">
                Member Sign:
              </div>
              <div className="border-b border-black h-8 flex items-end">
                Director Sign:
              </div>
            </div>
          </div>

          <p className="mt-10 text-[9px] text-center text-gray-400 uppercase tracking-widest">
            University Academic Record Copy - 2026
          </p>
          {/* Submit button - only triggered by logged in users normally, PrivateRoute will guard /form route */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition"
            >
              Submit Request
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
