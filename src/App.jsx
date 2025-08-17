import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Guidance from "./pages/Guidance";
import Doubt from "./pages/Doubt";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guidance" element={<Guidance />} />
        <Route path="/doubt" element={<Doubt />} />
      </Routes>
    </Router>
  );
}
