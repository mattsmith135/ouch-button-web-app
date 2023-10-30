import { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom";
import axios from "axios";

function Account() {
    let { therapistId } = useParams(); 
    const [therapistData, setTherapistData] = useState();
    const [loading, setLoading] = useState();


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const [therapistRes] = await Promise.all([
                    axios.get(`http://localhost:5000/therapistdata/${therapistId}`),
                ]);

                var therapistData = therapistRes.data; 

                setTherapistData(therapistData);
            } catch (err) {
                console.log(err.message); 
            } finally {
                // Now everything is loaded, render
                setLoading(false);
            }
        };
        
        fetchData();
    }, [therapistId])

    return (
        <div className="account">
                {loading ? (
                    "Loading"
                ) : (
                <>
                    <div className="account-header">    
                        <h1 className="account-header__heading">Account Overview</h1>
                    </div>
                    <div className="account-content">
                        <p>Name: {therapistData ? therapistData.TherapistName : "Loading"}</p>
                        <p>ID: {therapistData ? therapistData.TherapistID : "Loading"}</p>
                        <p>Email: {therapistData ? therapistData.TherapistEmail : "Loading"}</p>
                    </div>
                </>
                )} 
        </div>
    )
}

export default Account;