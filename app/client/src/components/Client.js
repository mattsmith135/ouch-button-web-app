import { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom";
import BarChart from "./BarChart";
import axios from "axios";

function calculateChartData(data) {
    //* Creates a hashmap containing key value pairs of weekday to number of button presses.
    //* Hashmap is then converted to chart data and displayed on a bar chart.
    const pressesPerDayHashMap = {}; 

    data.forEach((entry) => {
        const entryDate = new Date(entry); 
        const dayOfWeek = entryDate.getDay(); 
        if (pressesPerDayHashMap[dayOfWeek]) {
            pressesPerDayHashMap[dayOfWeek] += 1; 
        } else {
            pressesPerDayHashMap[dayOfWeek] = 1; 
        }
    });

    const newChartData = {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
            {
                label: "Number of Ouch Button Presses This Week",
                data: Object.values(pressesPerDayHashMap),
            },
        ],
    }

    return newChartData;
}

function calculateMostCommonTime(data) {
    //* Calculates the most common hour by sorting the 'timeOccurrences' object in descending order based on
    //*  the occurence count and then retrieving the key (hour) from the first element of the sorted array.
    
    const timeOccurrences = {}; 

    data.forEach((entry) => {
        const entryTime = new Date(entry); 
        const hour = entryTime.getHours(); 
        if (timeOccurrences[hour]) {
            timeOccurrences[hour] += 1; 
        } else {
            timeOccurrences[hour] = 1;
        }
    });

    const formatAMPM = (time) => {
        const hours = new Date(time).getHours(); 
        const minutes = new Date(time).getMinutes(); 
        const ampm = hours >= 12 ? "PM" : "AM"; 
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12; 
        const formattedMinutes = minutes.toString().padStart(2, "0");
    
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    const sortedOccurrences = Object.entries(timeOccurrences).sort((a, b) => b[1] - a[1]);
    const mostCommonHour = sortedOccurrences[0][0]; 

    const mostCommonTimePeriod = formatAMPM(new Date().setHours(mostCommonHour)); 

    return mostCommonTimePeriod;
}

function Client() {
    let { clientId } = useParams();
    const [clientData, setclientData] = useState([]); 
    const [ouchButtonData, setouchButtonData] = useState([]); 
    const [therapistData, settherapistData] = useState([]); 
    const [chartData, setChartData] = useState(); 
    const [mostCommonTime, setMostCommonTime] = useState(); 
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [clientRes, ouchButtonRes, therapistRes] = await Promise.all([
              axios.get("http://localhost:5000/clientdata"),
              axios.get("http://localhost:5000/ouchbuttondata"),
              axios.get("http://localhost:5000/therapistdata"),
            ]);
    
            setclientData(clientRes.data);
            setouchButtonData(ouchButtonRes.data);
            settherapistData(therapistRes.data);

            //* Filtering ouch button press dates for only dates within one week range.
            const ouchButtonEntryDates = ouchButtonRes.data.map((value) => value.Time);
            const today = new Date(); 
            const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); 
            const filteredData = ouchButtonEntryDates.filter((entry) => {
                const entryDate = new Date(entry); 
                return entryDate >= oneWeekAgo && entryDate <= today;
            });

            //* Passing filtered data into time and chart data functions accordingly.
            const chartData = calculateChartData(filteredData); 
            const mostCommonTime = calculateMostCommonTime(filteredData); 

            setChartData(chartData); 
            setMostCommonTime(mostCommonTime); 
          } catch (err) {
            setError("Error fetching data.");
          }
        };
    
        fetchData();
    }, []);

    return (
        <div className="client">
            <div className="search">
                <h4 className="search__label"> Search:</h4>
                <input type="text" name="client" />
            </div>
            <div className="client-header">
                <h4 className="client-header__subheading">User</h4>
                <h1 className="client-header__heading">test</h1>
            </div>
            <div className="client-content">
                <div className="client-metric">
                    {chartData && <BarChart chartData={chartData} />}
                </div>
                <div className="client-metric">
                    <h3 className="client-metric__heading">Most common time period button was pressed</h3>
                    {mostCommonTime ? <p>{mostCommonTime}</p> : <p>Loading...</p>}
                </div>

                <h2>Testing connectivity to all tables</h2> {clientId}
                {clientData.map((item) => { return <div key={item.ClientID}> {item.ClientName} </div>})}
                <p>----------------------------------------------------------</p>
                {ouchButtonData.map((item) => { return <div key={item.OuchButtonDataID}> {item.Time} </div>})}
                <p>----------------------------------------------------------</p>
                {therapistData.map((item) => { return <div key={item.TherapistID}> {item.TherapistEmail} </div>})}
                </div>
        </div>
    ); 
}

export default Client;