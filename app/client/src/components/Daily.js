import React from 'react'
import { useState, useEffect } from "react"; 
import axios from "axios";
import { useParams } from "react-router-dom";

function Daily() {
    let {clientId} = useParams();
    let { dayId } = useParams();
    const [ouchButtonData, setouchButtonData] = useState([]);
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
          try {
            const [ouchButtonRes] = await Promise.all([
              axios.get(`http://localhost:5000/ouchbuttondata/${clientId}/${dayId}`)
            ]);
            setouchButtonData(ouchButtonRes.data);
            console.log(clientId);
            console.log(dayId);
            console.log(ouchButtonRes.data);
          } catch (err) {
            setError("Error fetching data.");
          }
        };
    
        fetchData();
    }, [clientId, dayId]);

    
  return (
    <div>
        <p>Testing</p>
    </div>
  )
}

export default Daily
