import React from 'react'; 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import "./styles/sass/main.scss";
import Navbar from "./components/Navbar";
import Upload from "./components/Upload";
import Search from "./components/Search"; 
import Client from './components/Client';
import Daily from "./components/Daily";
import Login from "./components/login"; 
import Register from "./components/register"; 

function App() {

  return (
    <BrowserRouter>
    
    <main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/search" element={<Search />} />
        <Route path="/client/:clientId" element={<Client />}/> 
        <Route path="/client/:clientId/:dayId" element={<Daily />}/> 
        
      </Routes>
    </main>
    <Navbar />
    </BrowserRouter>
  );
}
export default App;
