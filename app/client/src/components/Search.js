import { useState, useEffect } from "react";
import Client from "./Client";
import axios from "axios";

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

    return (
        // FLOW TO IMPLEMENT
        // 1. User enters an identifier (ie. name, id, email etc.) into the search field
        // 2. A list is displayed containing clients who's properties match the search query
        // 3. The user selects a client from the list
        // 4. A client component is created. The ID of the selected client is passed-in as a prop to the Client component
        // 5. User is redirected to Client component page
        
        <div className="search">
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
                        <label>Search client:</label>
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
                                .filter((item) => {
                                    return search.toLowerCase() === ''
                                        ? item
                                        : item.ClientName.toLowerCase().includes(search); 
                                })
                                .map((item) => (
                                    <tr key={item.ClientID}>
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

        /*<Client clientId={clientId} />*/
    );
}

export default Search; 