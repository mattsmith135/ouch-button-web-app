import { Component, useState, useEffect, React } from "react"; 
import { Link, useParams } from "react-router-dom";
import logo from "../assets/logo.png"; 
import accountLogo from "../assets/therapist-profile-picture.jpg"; 
import Button from './Button';

function Navbar() {

  // Use UseParams() to get the Therapist Id to get the therapist name. 
  // Note: Get Ruben's stuff working

  return (
    <div>
      <nav className="nav">
        <div className="nav-container nav-container-left">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="nav-container nav-container-right">
          <div className="nav-user-account-control">
            <img src={accountLogo} alt="Portrait of person" className="nav-user-account-control__image" />
            <p className="nav-user-account-control__text">Antonio</p>
            <Button text="Log out"/>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Navbar