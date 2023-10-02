import { useState, useEffect, forwardRef } from "react"; 
import { useParams } from "react-router-dom";
import BarChart from "./BarChart";
import axios from "axios";

// Returns just the date in a datetime string
function Account() {
    let { therapistID } = useParams();
    const [therapistData, settherapistData] = useState([]);
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
        try {
            const [therapistRes] = await Promise.all([
            axios.get("http://localhost:5000/therapistdata")
            ]);

            // !Position of this line of code is important!
            setChartData(calculateChartData(ouchButtonRes.data));

            settherapistData(therapistRes.data);
            
        } catch (err) {
            setError("Error fetching data.");
        } 
        };

        fetchData();
    }, []); 


    return (
        <div className="account">
            Name: {therapistData ? <h1 className="account_header">{therapistData.TherapistName}</h1> : <h1 className="account_header">Loading</h1>}
            ID: {therapistData ? <h1 className="account_header">{therapistData.TherapistID}</h1> : <h1 className="account_header">Loading</h1>}
            Email: {therapistData ? <h1 className="account_header">{therapistData.TherapistEmail}</h1> : <h1 className="account_header">Loading</h1>}  
                <Pagination />
        </div>
    )
}



export default Account;