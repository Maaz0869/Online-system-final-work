import React, { useState } from 'react';
import { UserPlus, X, Mail, Lock, Building, User } from 'lucide-react';

const AddTeacherModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    department: 'Computer Science'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Teacher Data to Backend:", formData);
    // Yahan hum Axios ya Fetch call karenge backend API ko
    alert("Teacher Added Successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-indigo-600 p-6 flex justify-between items-center text-white">
          <h2 className="text-xl font-black uppercase tracking-wider flex items-center gap-2">
            <UserPlus size={24} /> Add New Teacher
          </h2>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <X size={28} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5 text-gray-800">
          <div>
            <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-widest">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="text" required
                placeholder="Enter Name"
                className="w-full bg-gray-50 border-2 border-gray-100 p-3 pl-10 rounded-xl outline-none focus:border-indigo-500 font-bold"
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-widest">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="email" required
                placeholder="teacher@university.edu"
                className="w-full bg-gray-50 border-2 border-gray-100 p-3 pl-10 rounded-xl outline-none focus:border-indigo-500 font-bold"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-widest">Initial Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="password" required
                placeholder="••••••••"
                className="w-full bg-gray-50 border-2 border-gray-100 p-3 pl-10 rounded-xl outline-none focus:border-indigo-500 font-bold"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-widest">Department</label>
            <div className="relative">
              <Building className="absolute left-3 top-3 text-gray-400" size={18} />
              <select 
                className="w-full bg-gray-50 border-2 border-gray-100 p-3 pl-10 rounded-xl outline-none focus:border-indigo-500 font-bold appearance-none cursor-pointer"
                onChange={(e) => setFormData({...formData, department: e.target.value})}
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTeacherModal;