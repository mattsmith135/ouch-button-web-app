import React from "react"; 
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"; 
import accountLogo from "../assets/therapist-profile-picture.jpg"; 
import Button from './Button';

function Navbar() {

  return (
    <div>
      <nav className="nav">
        <div className="nav-container nav-container-left">
          <Link to="/">
            <img src={Logo} alt="Logo" className="logo" />
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