import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

import { Component} from "react"; 
import { Link, useParams } from "react-router-dom";
import logo from "../assets/logo.png"; 
import accountLogo from "../assets/therapist-profile-picture.jpg"; 
import Button from './Button';

function Navbar() {

    //*Use UseParams to get the Therapist Id to get the therapist name. Note: Get Ruben's stuff working
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




function Search() {
    const [clientData, setclientData] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
              axios.get("http://localhost:5000/clientdata")
                .then(res => {
                    const clientData = res.data;
                    setclientData(clientData)
                })
            } catch (err) {
                setError("Error fetching data."); 
            }  
        }; 

        fetchData();
    }, []);

    const navigate = useNavigate(); 

    const handleRowClick = (clientId) => {
        navigate(`/client/${clientId}`); 
    }

    return (

        
        // FLOW
        // 1. User enters an identifier (name or id) into the search field
        // 2. Client data is pulled and a list is filted based on search query and then displayed
        // 3. User selects client from the list and is redirected to the client page showing this client's specific information
        
        <div className="search">
            {Navbar}
            <div className="search-wrapper">
                <div className="search-header"> 
                
                    <h1 className="search-header__heading">Search for a client</h1>
                    <p className="search-header__text">
                        Want to search for a specific client? Enter their name, ID, or email into the search field and press search.
                        You will be presented with a list of clients who's details match your search query.
                        Select the client from the list to view their unique profile.
                    </p>
                </div>
                <div className="search-content">
                    <div className="search-bar">
                        <label>Search:</label>
                        <input onChange={(e) => setSearch(e.target.value.toLowerCase())} type="search" id="client" name="client" />
                        <button>Search</button>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Client ID</th>
                                <th>Client Name</th>
                                <th>Client Ouch Button</th>
                                <th>Therapist ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientData
                                .filter((item) => 
                                    item.ClientName.toLowerCase().includes(search) ||
                                    item.ClientID.toString() === search.toLowerCase()
                                )
                                .map((item) => (
                                    <tr key={item.ClientID} className="clickable-row" onClick={() => handleRowClick(item.ClientID)}>
                                        <td>{item.ClientID}</td>
                                        <td>{item.ClientName}</td>
                                        <td>{item.ClientOuchButton}</td>
                                        <td>{item.TherapistID}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Search; 