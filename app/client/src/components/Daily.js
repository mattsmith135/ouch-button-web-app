import React from 'react'
import { useState, useEffect } from "react"; 
import axios from "axios";
import { useParams } from "react-router-dom";

function findTime(dateTimeString){
  const date = new Date(dateTimeString);
    const hour = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return formatAmPm(hour, minutes);
}

//function to format an hour into am or pm
function formatAmPm(hour, minutes){
  let ampm = "AM";

  if(hour > 12){
      hour -= 12;
      ampm = "PM";
  }

  return `${hour}:${minutes} ${ampm}`;

}

function Daily() {

    let {clientId} = useParams();
    let { dayId } = useParams();
    const [clientData, setclientData] = useState(); 
    const [ouchButtonData, setouchButtonData] = useState([]);
    const [error, setError] = useState(null)

    //fetching the data and putting it where it needs to go
    useEffect(() => {
        const fetchData = async () => {
          try {
            const [clientDataRes, ouchButtonRes ] = await Promise.all([
              axios.get(`http://localhost:5000/clientdata/${clientId}`),
              axios.get(`http://localhost:5000/ouchbuttondata/${clientId}/${dayId}`),
            ]);
            setouchButtonData(ouchButtonRes.data);
            setclientData(clientDataRes.data);
          } catch (err) {
            setError("Error fetching data.");
          }
        };
    
        fetchData();
    }, []);

    
  return (
    <div>
      <div>
      {clientData ? <p>{clientData.ClientName}</p> : <p>Loading</p>}
      </div>
      <div>
        <p>Button presses for: {dayId}</p>
      </div>
      <div>
        {ouchButtonData.map((entry) => (
            <div key={entry.OuchButtonDataID}>
              {ouchButtonData ? <p>{entry.Location} at {findTime(entry.Time)}</p> : <p>Loading</p>}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Daily
