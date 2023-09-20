import React from 'react'; 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import "./styles/sass/main.scss";
import Navbar from "./components/Navbar";
import Upload from "./components/Upload";
import Search from "./components/Search"; 
import Client from './components/Client';
import Login from './components/login';
import Register from './components/register';

function App() {

  return (
    <BrowserRouter>
    <Navbar />
    <main>
      <Routes>
        <Route path="/upload" element={<Upload />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Test clientId prop! In future, <Client /> will be created from the <Search /> component */}
        <Route path="/client/:clientId" element={<Client />}/> 
      </Routes>
    </main>
    </BrowserRouter>
  );
}

export default App;
