import React from 'react'; 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import "./styles/sass/main.scss";
import Navbar from "./components/Navbar";
import Upload from "./components/Upload"; 
import MainPage from './components/MainPage';

function App() {
  return (
    <BrowserRouter>
    < MainPage />
    <Navbar />
    <main>
      <Routes>
        <Route path="/upload" element={<Upload />} />
        <Route path="/mainpage" element={<MainPage />} />
      </Routes>
    </main>
    </BrowserRouter>
  );
}

export default App;
