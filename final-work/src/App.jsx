import { Routes, Route } from "react-router";
import StudentNavbar from "./components/StudentNavbar";
import StudentDash from "./pages/StudentDash";
import Home from "./pages/Home";
import About from "./pages/About";
import Form from "./pages/Form";
import Footer from "./components/Footer";
function App() {
 

  return (
    <>
      <StudentNavbar />
      <Routes>
         <Route path="/dashboard" element={<StudentDash />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<h1>Project Page</h1>} />
        <Route path="/form" element={<Form />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
