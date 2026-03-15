import React, { useState, useEffect } from "react";

const TeacherProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    designation: "",
    email: "",
    bio: "",
    office: "",
    expertise: ["MERN Stack", "Cyber Security"],
    profileImg: null,
  });

  const [newSkill, setNewSkill] = useState("");
  const [canEdit, setCanEdit] = useState(true);

  const handleInput = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // convert to data URL so it persists in localStorage
      const reader = new FileReader();
      reader.onload = () => {
        setProfile({ ...profile, profileImg: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    try {
      const raw = localStorage.getItem("teachers");
      let arr = raw ? JSON.parse(raw) : [];

      // replace existing by email or push new
      // if editing is locked, prevent further changes
      if (!canEdit) {
        alert("Profile is locked and cannot be changed again. Contact admin.");
        return;
      }

      const idx = arr.findIndex((t) => t.email === profile.email);
      if (idx >= 0) {
        // preserve id and mark as locked
        arr[idx] = { ...arr[idx], ...profile, locked: true };
      } else {
        // give an id if missing and mark as locked
        const id = arr.length
          ? Math.max(...arr.map((x) => x.id || 0)) + 1
          : 100;
        arr.push({ ...profile, id, locked: true });
      }
      localStorage.setItem("teachers", JSON.stringify(arr));
      // optionally notify other tabs
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "teachers",
          newValue: JSON.stringify(arr),
        }),
      );
      // lock further edits in this tab as well
      setCanEdit(false);
      setProfile((p) => ({ ...p, locked: true }));
      alert("Profile saved and locked — it will appear on the About page.");
    } catch (err) {
      console.error(err);
      alert("Unable to save profile locally.");
    }
  };

  const addSkill = () => {
    if (newSkill && !profile.expertise.includes(newSkill)) {
      setProfile({ ...profile, expertise: [...profile.expertise, newSkill] });
      setNewSkill("");
    }
  };

  const removeSkill = (skill) => {
    setProfile({
      ...profile,
      expertise: profile.expertise.filter((s) => s !== skill),
    });
  };

  // populate email from logged-in user (localStorage) and keep in sync
  useEffect(() => {
    const loadUserEmail = () => {
      try {
        const raw = localStorage.getItem("user");
        if (!raw) return;
        const u = JSON.parse(raw);
        if (u && u.email) {
          setProfile((p) => ({ ...p, email: u.email }));
        }
      } catch (err) {
        // ignore
      }
    };

    loadUserEmail();

    const onStorage = (e) => {
      if (e.key === "user") {
        loadUserEmail();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // when we have the user's email, check if a profile was already saved — if so, load and lock it
  useEffect(() => {
    if (!profile.email) return;
    try {
      const raw = localStorage.getItem("teachers");
      const arr = raw ? JSON.parse(raw) : [];
      const found = arr.find((t) => t.email === profile.email);
      if (found) {
        setProfile((p) => ({ ...p, ...found }));
        // if a saved profile exists, prevent further edits
        setCanEdit(false);
      }
    } catch (err) {
      // ignore
    }
  }, [profile.email]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex justify-center items-center p-6 pt-28">
      <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl shadow-blue-100/50 overflow-hidden border border-white">
        {/* Blue Header Accent */}
        <div className="bg-[#002147] p-8 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black italic">Edit Profile</h2>
            <p className="text-blue-200 text-xs uppercase tracking-widest mt-1">
              Information will reflect on the About Page
            </p>
          </div>
          <div className="h-12 w-12 bg-yellow-400 rounded-2xl flex items-center justify-center text-[#002147] font-bold shadow-lg">
            ✍️
          </div>
        </div>

        {/* Locked notice when editing is disabled */}
        {!canEdit && (
          <div className="mt-4 p-3 rounded-xl bg-yellow-50 border border-yellow-100 text-yellow-800 text-sm font-semibold">
            Your profile is locked and cannot be changed again. Contact an
            administrator to request edits.
          </div>
        )}

        <div className="p-8 md:p-12 space-y-8">
          {/* Photo Section */}
          <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 p-6 rounded-[2rem]">
            <div className="h-28 w-28 bg-white rounded-3xl overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
              {profile.profileImg ? (
                <img
                  src={profile.profileImg}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-4xl bg-blue-50 text-blue-200 font-bold">
                  {profile.name[0]}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-400">
                Profile Picture
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                disabled={!canEdit}
                className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-[#002147] file:text-white hover:file:bg-blue-800 transition cursor-pointer"
              />
            </div>
          </div>

          {/* Input Fields (stacked) */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block">
                Full Name
              </label>
              <input
                name="name"
                value={profile.name}
                onChange={handleInput}
                placeholder="Enter your full name"
                disabled={!canEdit}
                className={`w-full p-4 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 outline-none font-bold text-[#002147] ${
                  !canEdit
                    ? "bg-gray-100 cursor-not-allowed text-gray-500"
                    : "bg-gray-50"
                }`}
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block">
                Specialization
              </label>
              <input
                name="designation"
                value={profile.designation}
                onChange={handleInput}
                placeholder="IT Student & MERN Stack Developer"
                disabled={!canEdit}
                className={`w-full p-4 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 outline-none font-bold text-[#002147] ${
                  !canEdit
                    ? "bg-gray-100 cursor-not-allowed text-gray-500"
                    : "bg-gray-50"
                }`}
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block">
              Professional Bio
            </label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleInput}
              rows="3"
              disabled={!canEdit}
              className={`w-full p-4 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 outline-none text-sm italic text-gray-600 ${
                !canEdit
                  ? "bg-gray-100 cursor-not-allowed text-gray-500"
                  : "bg-gray-50"
              }`}
            />
          </div>

          {/* Expertise Section */}
          <div>
            <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block">
              My Expertise (Tags)
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.expertise.map((s, i) => (
                <span
                  key={i}
                  className="bg-blue-50 text-[#002147] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-blue-100"
                >
                  {s}
                  <button
                    onClick={() => removeSkill(s)}
                    disabled={!canEdit}
                    className={`text-red-400 text-lg ${
                      !canEdit
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:text-red-600"
                    }`}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="e.g. Machine Learning"
                disabled={!canEdit}
                className={`flex-1 p-4 rounded-2xl outline-none focus:ring-1 focus:ring-gray-200 text-sm ${
                  !canEdit
                    ? "bg-gray-100 cursor-not-allowed text-gray-500"
                    : "bg-gray-50"
                }`}
              />
              <button
                onClick={addSkill}
                disabled={!canEdit}
                className={`bg-yellow-400 text-[#002147] px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition ${
                  !canEdit ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Add
              </button>
            </div>
          </div>

          {/* Office & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block">
                Office Location
              </label>
              <input
                name="office"
                value={profile.office}
                onChange={handleInput}
                placeholder="Room 204, IT Block"
                disabled={!canEdit}
                className={`w-full p-4 rounded-2xl border-none outline-none font-bold text-sm ${
                  !canEdit
                    ? "bg-gray-100 cursor-not-allowed text-gray-500"
                    : "bg-gray-50"
                }`}
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block">
                Email Address
              </label>
              <input
                name="email"
                value={profile.email}
                readOnly
                className="w-full p-4 bg-gray-100 rounded-2xl border-none text-gray-400 cursor-not-allowed text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              onClick={handleUpdate}
              disabled={!canEdit}
              className={`w-full py-5 ${
                canEdit
                  ? "bg-[#002147] text-white hover:bg-blue-800"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              } rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-200 transition-all transform active:scale-95`}
            >
              {canEdit ? "Update Profile Now" : "Profile Locked"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
