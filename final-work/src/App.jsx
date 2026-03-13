import { Routes, Route, Navigate } from "react-router-dom";
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
// import AddTeacher from "./pages/admin/AddTeacher";
import LoginForm from "./pages/LoginForm";
import SignUPForm from "./pages/SignUPForm";

function App() {
  // Simple private route wrapper - checks localStorage for user
  const PrivateRoute = ({ children }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) return children;
    } catch (e) {
      // ignore
    }
    return <Navigate to="/login" replace />;
  };
  return (
    <>
      <StudentNavbar />
      <Routes>
        <Route path="/dashboard" element={<StudentDash />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<h1>Project Page</h1>} />
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUPForm />} />
      </Routes>
      <Footer />
      {/* ab is ki bad ham TEacher ka section banahi gi  */}
      {/* <TeacherNavbar />
      <Routes>
        <Route path="/dashboard" element={<TeacherDash />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<TeacherProfile />} />
      </Routes>
      <Footer /> */}
      {/* <AdminNavbar /> */}
      {/* Admin ke liye bhi ham ek dashboard bana sakte hain jisme wo users aur projects manage kar sake */}
      {/* <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/Addteacher" element={<AddTeacher />} />
        <Route path="/admin/all-projects" element={<h1>All Projects</h1>} />
      </Routes> */}
      {/* <Footer /> */}
      {/* Login/Signup moved into routes so they don't render all the time */}
    </>
  );
}

export default App;
