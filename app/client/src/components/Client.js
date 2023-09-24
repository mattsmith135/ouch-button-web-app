import { useState, useEffect, forwardRef } from "react"; 
import { useParams } from "react-router-dom";
import BarChart from "./BarChart";
import axios from "axios";

// Returns just the date in a datetime string
function findDate(dateTimeString) {
    const date = new Date(dateTimeString);

    // Format correctly
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

// Returns just the hour from a datetime string
function findHour(dateTimeString) {
    const date = new Date(dateTimeString);
    const hour = String(date.getHours()).padStart(2, "0");
    return `${hour}`;
}

// Returns the day of the week in words
function findDay(number) {
    if (number === 0){
        return "Sunday";
    }
    else if (number === 1){
        return "Monday";
    }
    else if (number === 2){
        return "Tuesday";
    }
    else if (number === 3){
        return "Wednesday";
    }
    else if (number === 4){
        return "Thursday";
    }
    else if (number === 5){
        return "Friday";
    }
    else {
        return "Saturday";
    }
}

// Returns array of dates of the previous week
function getLastWeekDates() {
    const today = new Date(); 

    const lastweek = new Date(); 
    lastweek.setDate(today.getDate() - 6);

    const rangeOfDates = [];

    let counterDate = new Date(lastweek);

    while (counterDate <= today) {
        rangeOfDates.push(findDate(counterDate)); 
        counterDate.setDate(counterDate.getDate() + 1);
    }

    return rangeOfDates;
}

// Returns an array of days of the previous week
function getLastWeekDays() {
    const today = new Date();
    const dayOfWeek = today.getDay(); 

    const lastweek = new Date(); 
    lastweek.setDate(today.getDate() - 6);
    const dayOfLastWeek = lastweek.getDay();

    const rangeOfDays = [];

    let counterDay = dayOfLastWeek

    while (counterDay !== dayOfWeek) {
        if (counterDay === 7){
            counterDay = 0;
        }
        rangeOfDays.push(findDay(counterDay));
        counterDay += 1;
    }
    return rangeOfDays
}

// Formats an hour into am or pm
function formatAMPM(hour) {
    let ampm = "AM";

    if (hour > 12) {
        hour -= 12;
        ampm = "PM";
    }

    return hour + ampm;

}

// Filters ouchButtonData to only return objects within date range
function getFilteredData(data) {

    let index = 0;
    const rangeOfDates = getLastWeekDates();
    const filteredData = []

    data.forEach((entry) => {

        while (index < rangeOfDates.length) {
            if (findDate(entry.Time) === rangeOfDates[index]) {
                filteredData.push(entry);
            }


            index = index + 1;
        }

        index = 0;
        
    });

    return filteredData;
}

// Returns an array of button presses. 1 for each day of the week 
// Intended for use in calculateChartData()
function getArrayOfPresses(data, rangeOfDates) {

    let index = 0; 
    const rangeOfPresses = [0, 0, 0, 0, 0, 0, 0];

    data.forEach((entry) => {

        while (index < rangeOfDates.length){
            
            if (findDate(entry.Time) === rangeOfDates[index]) {
                rangeOfPresses[index] += 1; 
            }
            index = index + 1;
        } 

        index = 0;
        
    });

    return rangeOfPresses;
}
 
function calculateChartData(data) {

    const rangeOfDates = getLastWeekDates();
    const rangeOfDays = getLastWeekDays();
    const rangeOfPresses = getArrayOfPresses(getFilteredData(data), rangeOfDates);
    

        const newChartData = {
            labels: rangeOfDays,
            datasets: [
                {
                    label: "Number of Ouch Button Presses This Week", 
                    data: rangeOfPresses, 
                    links: rangeOfDates, // Dates returned unique to each bar when the bar is clicked. To be used as dayId for the Daily component
                },
            ],
        };
    
        return newChartData;
        
}

// Returns the most common hour in an array of data
function calculateMostCommonTime(data) {
    
    const hours = []; 

    data.forEach((entry) => {
        hours.push(findHour(entry.Time));
    });

    hours.sort((a,b) => b -a); // Sorts array in descending order

    let index = 0;
    let frequency = 1;
    let mostCommonFrequency = 1;
    let mostCommonTime = hours[0];

    
    while (index < [hours.length - 1]) {

        if (hours[index] === hours[index + 1]) {
            frequency += 1;

            if (frequency > mostCommonFrequency) {
                mostCommonFrequency = frequency;
                mostCommonTime = hours[index];
            }
        }
        else {
            frequency = 1;
        }

        index += 1;
        
    }

    return mostCommonTime;
        
}

// Returns the most common location in an array of data
function getMostCommonLocation(data) {
    const filteredData = getFilteredData(data);

    const locations = []

    const frequency = {}; // to store each location and its frequency

    filteredData.forEach((entry) => {
        locations.push(entry.Location);
    });

    locations.forEach((entry) => {

        // if entry already exists in frequency, increment its frequency
        if (frequency[entry]) {
            frequency[entry]++;
        }

        // if not, add it
        else {
            frequency[entry] = 1;
        }
    });

    let mostCommonLocation = "";
    let mostFrequent = 0;

    for (const key in frequency) {
        if (frequency[key] > mostFrequent) {
            mostFrequent = frequency[key];
            mostCommonLocation = key;
        }
    }
    
    return mostCommonLocation;  
}

function Client() {
    let { clientId } = useParams();
    const [clientData, setclientData] = useState(); 
    const [ouchButtonData, setouchButtonData] = useState([]);
    const [therapistData, settherapistData] = useState([]); 
    const [chartData, setChartData] = useState(); 
    const [mostCommonTime, setMostCommonTime] = useState(); 
    const [HighestPress, setHighestPress] = useState(); 
    const [mostCommonLocation, setMostCommonLocation] = useState();
    const [error, setError] = useState(null)

    useEffect(() => {

        const fetchData = async () => {
        try {
            const [clientRes, ouchButtonRes, therapistRes] = await Promise.all([
            axios.get(`http://localhost:5000/clientdata/${clientId}`),
            axios.get(`http://localhost:5000/ouchbuttondata/${clientId}`),
            axios.get("http://localhost:5000/therapistdata"),
            ]);

            // !Position of this line of code is important!
            setChartData(calculateChartData(ouchButtonRes.data));

            setclientData(clientRes.data); 
            setouchButtonData(ouchButtonRes.data);
            settherapistData(therapistRes.data);
            
            const mostCommonTime = calculateMostCommonTime(getFilteredData(ouchButtonRes.data)); 
            const mostCommonLocation = getMostCommonLocation(ouchButtonRes.data);
            // const highestPresses = Math.max(getArrayOfPresses(getFilteredData(ouchButtonRes.data), getLastWeekDates()));

            setMostCommonLocation(mostCommonLocation);
            setMostCommonTime(mostCommonTime); 
            
        } catch (err) {
            setError("Error fetching data.");
        } 
        };

        fetchData();
    }, []); 


    return (
        <div className="client">
            <div className="client-header">
                <h4 className="client-header__subheading">User</h4>
                {clientData ? <h1 className="client-header__heading">{clientData.ClientName}</h1> : <h1 className="client-header__heading">Loading</h1>}
            </div>
            <div className="client-content">
                <div className="client-metric">
                    {chartData && <BarChart chartData={chartData} clientId={clientId}/>} 
                </div> 
                <div className="client-metric"> 
                    <h3 className="client-metric__heading">This week, the button was pressed most around:</h3>
                    {formatAMPM(mostCommonTime) ? <p>{formatAMPM(mostCommonTime)}</p> : <p>Loading...</p>}
                </div>
            </div>
            <div className="client-metric">
                <h3 className="client-metric__heading">
                    The location the button was pressed the most in was:
                </h3>
                {mostCommonLocation ? <p>{mostCommonLocation}</p> : <p>Loading...</p>}
            </div>
        </div>
    ); 
}

export default Client;