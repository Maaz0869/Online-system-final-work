import React, { useState } from "react";

export default function AddTeacherNew() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, department, password } = form;
    if (!name || !email || !department || !password) {
      alert("Please provide Name, Email, Department and Password.");
      return;
    }

    try {
      const usersRaw = localStorage.getItem("users");
      const users = usersRaw ? JSON.parse(usersRaw) : [];
      const existing = users.find((u) => u.email === email);
      if (existing) {
        const ok = window.confirm(
          "A user with this email already exists. Overwrite credentials?",
        );
        if (!ok) return;
        const updated = users.map((u) =>
          u.email === email
            ? { ...u, password, role: "teacher", name, department }
            : u,
        );
        localStorage.setItem("users", JSON.stringify(updated));
        alert("Teacher account updated.");
        setForm({ name: "", email: "", department: "", password: "" });
        return;
      }

      users.push({ email, password, role: "teacher", name, department });
      localStorage.setItem("users", JSON.stringify(users));
      alert(
        "Teacher account created. Share the login details with the teacher.",
      );
      setForm({ name: "", email: "", department: "", password: "" });
    } catch (err) {
      console.error(err);
      alert("Unable to create teacher account.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1724] p-6 md:p-12 text-white">
      <div className="max-w-2xl mx-auto bg-white/5 border border-white/5 rounded-2xl p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-black">Add Teacher Account</h2>
          <p className="text-sm text-gray-300">
            Admins can create teacher login credentials here. Teachers will
            complete their own profiles after signing in.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs font-black uppercase text-gray-300">
              Official Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-xl bg-white/10 outline-none text-gray-100"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase text-gray-300">
              Email Address
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              className="w-full mt-2 p-3 rounded-xl bg-white/10 outline-none text-gray-100"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase text-gray-300">
              Department
            </label>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-xl bg-white/10 outline-none text-gray-100"
              placeholder="e.g. CS, IT"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase text-gray-300">
              Temporary Password
            </label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              className="w-full mt-2 p-3 rounded-xl bg-white/10 outline-none text-gray-100"
              placeholder="Enter a temporary password"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 px-6 py-3 rounded-2xl font-black"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
