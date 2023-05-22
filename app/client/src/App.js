import React from 'react'; 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import "./styles/sass/main.scss";
import Navbar from "./components/Navbar";
import Upload from "./components/Upload"; 
import Client from './components/Client';

function App() {

  return (
    <BrowserRouter>
    <Navbar />
    <main>
      <Routes>
        <Route path="/upload" element={<Upload />} />
        {/* Test clientId prop! In future, <Client /> will be created from the <Search /> component */}
        <Route path="/client" element={<Client clientId={6} />} /> 
      </Routes>
    </main>
    </BrowserRouter>
  );
}

export default App;
