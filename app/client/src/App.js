import React from 'react'; 
import { BrowserRouter as Router, Route } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./styles/sass/main.scss";

function App() {
  return (
    <Router>
      <div></div>
      <h1>Test text</h1>
      {/*
      <Route path="/" exact component={} />
      */}
    </Router>
  );
}

export default App;
