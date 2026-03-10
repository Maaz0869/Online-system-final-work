import React, { useState } from "react";

const TeacherProfile = () => {
  const [profile, setProfile] = useState({
    name: "Maaz khan",
    designation: "IT Student & MERN Stack Developer",
    email: "maaz13888@aup.edu.pk",
    bio: "Helping students build scalable web applications and AI solutions.",
    office: "Room 204, IT Block",
    expertise: ["MERN Stack", "Cyber Security"],
    profileImg: null,
  });

  const [newSkill, setNewSkill] = useState("");

  const handleInput = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, profileImg: URL.createObjectURL(file) });
    }
  };

  const addSkill = () => {
    if (newSkill && !profile.expertise.includes(newSkill)) {
      setProfile({ ...profile, expertise: [...profile.expertise, newSkill] });
      setNewSkill("");
    }
  };

  const removeSkill = (skill) => {
    setProfile({ ...profile, expertise: profile.expertise.filter(s => s !== skill) });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex justify-center items-center p-6 pt-28">
      <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl shadow-blue-100/50 overflow-hidden border border-white">
        
        {/* Blue Header Accent */}
        <div className="bg-[#002147] p-8 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black italic">Edit Profile</h2>
            <p className="text-blue-200 text-xs uppercase tracking-widest mt-1">Information will reflect on the About Page</p>
          </div>
          <div className="h-12 w-12 bg-yellow-400 rounded-2xl flex items-center justify-center text-[#002147] font-bold shadow-lg">
            ✍️
          </div>
        </div>

        <div className="p-8 md:p-12 space-y-8">
          
          {/* Photo Section */}
          <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 p-6 rounded-[2rem]">
            <div className="h-28 w-28 bg-white rounded-3xl overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
              {profile.profileImg ? (
                <img src={profile.profileImg} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-4xl bg-blue-50 text-blue-200 font-bold">
                  {profile.name[0]}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-400">Profile Picture</label>
              <input 
                type="file" 
                onChange={handleImageChange}
                className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-[#002147] file:text-white hover:file:bg-blue-800 transition cursor-pointer"
              />
            </div>
          </div>

          {/* Input Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block">Full Name</label>
              <input name="name" value={profile.name} onChange={handleInput} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 outline-none font-bold text-[#002147]" />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block">Designation</label>
              <input name="designation" value={profile.designation} onChange={handleInput} className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 outline-none font-bold text-[#002147]" />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block">Professional Bio</label>
            <textarea name="bio" value={profile.bio} onChange={handleInput} rows="3" className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-600 outline-none text-sm italic text-gray-600" />
          </div>

          {/* Expertise Section */}
          <div>
            <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block">My Expertise (Tags)</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.expertise.map((s, i) => (
                <span key={i} className="bg-blue-50 text-[#002147] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-blue-100">
                  {s}
                  <button onClick={() => removeSkill(s)} className="text-red-400 hover:text-red-600 text-lg">&times;</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input 
                value={newSkill} 
                onChange={(e) => setNewSkill(e.target.value)} 
                placeholder="e.g. Machine Learning"
                className="flex-1 p-4 bg-gray-50 rounded-2xl outline-none focus:ring-1 focus:ring-gray-200 text-sm"
              />
              <button onClick={addSkill} className="bg-yellow-400 text-[#002147] px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition">Add</button>
            </div>
          </div>

          {/* Office & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block">Office Location</label>
              <input name="office" value={profile.office} onChange={handleInput} className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold text-sm" />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block">Email Address</label>
              <input name="email" value={profile.email} readOnly className="w-full p-4 bg-gray-100 rounded-2xl border-none text-gray-400 cursor-not-allowed text-sm" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button className="w-full py-5 bg-[#002147] text-white rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-200 hover:bg-blue-800 transition-all transform active:scale-95">
              Update Profile Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;