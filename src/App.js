import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PreferencesPage from "./components/pages/PreferencesPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
      <div className="w-[20rem] fixed -z-10 h-[10rem] bg-teal-300 blur-[10rem] top-[10rem] left-[10rem]"></div>
        <div className="w-[30rem] fixed -z-10 h-[20rem] bg-blue-500 blur-[15rem] top-[1rem] right-[2rem]"></div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/preferences" element={<PreferencesPage />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
