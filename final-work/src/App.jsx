import { Routes, Route } from "react-router-dom";
import StudentNavbar from "./components/StudentNavbar";
import StudentDash from "./pages/student/StudentDash";
import Home from "./pages/student/Home";
import About from "./pages/student/About";
import Form from "./pages/student/Form";
import Footer from "./components/Footer";
import TeacherNavbar from "./components/TeacherNavbar";
import TeacherDash from "./pages/teacher/TeacherDash";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import AdminNavbar from "./components/AdminNavbar";
import AdminDashboard from "./pages/admin/AdminDash";

import AddTeacherModal from "./pages/admin/AddTeacherModal";

function App() {
  return (
    <>
      {/* <StudentNavbar />
      <Routes>
         <Route path="/dashboard" element={<StudentDash />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<h1>Project Page</h1>} />
        <Route path="/form" element={<Form />} />
      </Routes>
      <Footer /> */}
      {/* ab is ki bad ham TEacher ka section banahi gi  */}
      {/* <TeacherNavbar />
      <Routes>
        <Route path="/dashboard" element={<TeacherDash />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<TeacherProfile />} />
      </Routes>
      <Footer /> */}
      <AdminNavbar />
      {/* Admin ke liye bhi ham ek dashboard bana sakte hain jisme wo users aur projects manage kar sake */}
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/Add-teacher" element={<AddTeacherModal />} />
        <Route path="/admin/all-projects" element={<h1>All Projects</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
