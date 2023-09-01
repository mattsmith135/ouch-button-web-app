import { Component } from "react"; 
import Client from "./Client";

class Search extends Component {
    constructor(props) {
        super(props); 
    }

    render() {
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
                        <p classname="search-header__text">
                            Want to search for a specific client? Enter their name, ID, or email into the search field and press search.
                            You will be presented with a list of clients who's details match your search query.
                            Select the client from the list to view their unique profile.
                        </p>
                    </div>
                    <div className="search-content">
                        <div className="search-bar">
                            <label for="client">Search client:</label>
                            <input type="search" id="client" name="client" />
                            <button>Search</button>
                        </div>
                    </div>
                </div>
            </div>

            /*<Client clientId={clientId} />*/
        );
    }
}

export default Search; 