import { Component } from "react"; 
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; 
import accountLogo from "../assets/therapist-profile-picture.jpg"; 
import Button from './Button';

class Navbar extends Component {
    constructor(props) {
        super(props); 
    }
    
    render() {
        return (
            <nav className="nav">
                <div className="nav-container nav-container-left">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="logo" />
                    </Link>
                </div>
                <div className="nav-container nav-container-right">
                    <div className="nav-user-account-control">
                        <img src={accountLogo} alt="Portrait picture of person" className="nav-user-account-control__image" />
                        <p className="nav-user-account-control__text">Jenny</p>
                        <Button text="Log out"/>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar; 