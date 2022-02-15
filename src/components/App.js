import { Routes, Route } from "react-router-dom";
import "../css/output.css";
import Profil from "./Profil";
import Home from "./Home";
function App() {
  return (
    <div className="h-full flex">
      <Profil />
      <div className="ml-80 w-full">
        <Routes path="/" element={<Home />}>
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
