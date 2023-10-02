import React from 'react'
import { useState, useEffect } from "react"; 
import axios from "axios";
import { useParams } from "react-router-dom";

function getTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const hour = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return formatAMPM(hour, minutes);
}

function formatAMPM(hour, minutes) {
  let ampm = "AM";

  if (hour > 12) {
    hour -= 12;
    ampm = "PM";
  }

  return `${hour}:${minutes} ${ampm}`;
}

function Daily() {
  let { clientId } = useParams();
  let { dayId } = useParams();
  const [clientData, setclientData] = useState(); 
  const [ouchButtonData, setouchButtonData] = useState([]);
  const [error, setError] = useState(null)

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
    <div className="daily">
      <div className="daily-wrapper">
        <div className="daily-header">
          <div className="daily-header__loading">
            {clientData ? <h1>{clientData.ClientName}</h1> : <h1>Loading</h1>}
          </div>
        </div>
        <div className="daily-header">
          <h1 className="daily-header__heading">Button presses for: {dayId}</h1>
        </div>
        <div className="daily-table">
          {ouchButtonData.map((entry) => (
            <div key={entry.OuchButtonDataID}>
              {ouchButtonData ? <p>{entry.Location} at {getTime(entry.Time)}</p> : <p>Loading</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default Daily
