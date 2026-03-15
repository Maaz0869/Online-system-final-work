import { Routes, Route, Navigate } from "react-router-dom";
import StudentNavbar from "./components/StudentNavbar";
import StudentDash from "./pages/student/StudentDash";
import Home from "./pages/student/Home";
import About from "./pages/student/About";
import Form from "./pages/student/Form";
import Project from "./pages/student/Project";
import Footer from "./components/Footer";
import TeacherNavbar from "./components/TeacherNavbar";
import TeacherDash from "./pages/teacher/TeacherDash";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import AdminNavbar from "./components/AdminNavbar";
import AdminDashboard from "./pages/admin/AdminDash";
import AddTeacher from "./pages/admin/AddTeacherNew";
import LoginForm from "./pages/LoginForm";
import SignUPForm from "./pages/SignUPForm";

// Simple private route wrapper which checks localStorage for user and optional role
const PrivateRoute = ({ children, roles }) => {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return <Navigate to="/login" replace />;
    const user = JSON.parse(raw);
    if (!roles || roles.length === 0) return children;
    if (roles.includes(user.role)) return children;
    // role mismatch
    return <Navigate to="/login" replace />;
  } catch (e) {
    return <Navigate to="/login" replace />;
  }
};

function App() {
  // Simple private route wrapper - checks localStorage for user
  // const PrivateRoute = ({ children }) => {
  //   try {
  //     const user = JSON.parse(localStorage.getItem("user"));
  //     if (user) return children;
  //   } catch (e) {
  //     // ignore
  //   }
  //   return <Navigate to="/login" replace />;
  // };
  // determine which navbar to show based on logged-in user
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null;
  }

  return (
    <>
      {/* Conditional Navbar */}
      {user?.role === "teacher" ? (
        <TeacherNavbar />
      ) : user?.role === "admin" ? (
        <AdminNavbar />
      ) : (
        <StudentNavbar />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />
        <Route
          path="/form"
          element={
            <PrivateRoute roles={["student"]}>
              <Form />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUPForm />} />

        {/* Dashboards - protected by role */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute roles={["student"]}>
              <StudentDash />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/dashboard"
          element={
            <PrivateRoute roles={["teacher"]}>
              <TeacherDash />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/profile"
          element={
            <PrivateRoute roles={["teacher"]}>
              <TeacherProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute roles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-teacher"
          element={
            <PrivateRoute roles={["admin"]}>
              <AddTeacher />
            </PrivateRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
