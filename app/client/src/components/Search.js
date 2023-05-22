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
            
            <Client clientId={clientId} />
        );
    }
}

export default Search; 