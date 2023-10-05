import { useState } from "react"; 
import Pagination from "./Pagination";

function Account() {
    const [therapistData, settherapistData] = useState([]);

    // Fetch therapist data using axios and store in state 

    return (
        <div className="account">
            Name: {therapistData ? <h1 className="account-header">{therapistData.TherapistName}</h1> : <h1 className="account-header">Loading</h1>}
            ID: {therapistData ? <h1 className="account-header">{therapistData.TherapistID}</h1> : <h1 className="account-header">Loading</h1>}
            Email: {therapistData ? <h1 className="account-header">{therapistData.TherapistEmail}</h1> : <h1 className="account-header">Loading</h1>}  
            <Pagination />
        </div>
    )
}



export default Account;