import React from 'react'; 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import "./styles/sass/main.scss";
import Navbar from "./components/Navbar";
import Upload from "./components/Upload"; 

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <main>
      <Routes>
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </main>
    </BrowserRouter>
  );
}

export default App;
