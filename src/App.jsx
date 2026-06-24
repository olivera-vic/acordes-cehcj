import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./views/Home";
import SongDetail from "./views/SongDetail";

function App() {
  return (
    <>
      <Navbar />

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/song/:id" element={<SongDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;