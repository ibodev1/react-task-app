import { Routes, Route } from "react-router-dom";
import "../css/output.css";
import Profil from "./Profil";
import Home from "./Home";
import Privacy from "./Privacy";
import Service from "./Service";
function App() {
  return (
    <div className="h-full flex">
      <Profil />
      <div className="ml-80 w-full">
        <Routes path="/" element={<Home />}>
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/service" element={<Service />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
