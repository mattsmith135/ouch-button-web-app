import { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom";
import BarChart from "./BarChart";
import axios from "axios";

// function to return just the date in a datetime string
function findDate(dateTimeString){
    const date = new Date(dateTimeString);

    //Format correctly
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

//fuction to return just the hour from a datetime string
function findHour(dateTimeString) {
    const date = new Date(dateTimeString);
    const hour = String(date.getHours()).padStart(2, "0");
    return `${hour}`;
  }

//function to return just the minutes from a datetime string
function findMinutes(dateTimeString){
    const date = new Date(dateTimeString);
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${minutes}`;
}

//function to return the day of the week in words
function findDay(number){
    if(number === 0){
        return "Sunday";
    }
    else if(number === 1){
        return "Monday";
    }
    else if(number === 2){
        return "Tuesday";
    }
    else if(number === 3){
        return "Wednesday";
    }
    else if(number === 4){
        return "Thursday";
    }
    else if(number === 5){
        return "Friday";
    }
    else{
        return "Saturday";
    }
}

//function to get an array of dates of the previous week
function getLastWeekDates(){
    // Dealing with the DATES of throughout the previous week

    const today = new Date(); // Get the current date
    //const todaysDate = findDate(today); // Get just the date of today without the hours

    const lastweek = new Date(); // Created to store the date of 7 days ago
    lastweek.setDate(today.getDate() - 6);// Setting to 1 week ago

    const rangeOfDates = []; // To store the dates from last week all the way to today

    let counterDate = new Date(lastweek); // variable used to control the loop below used to populate an array of dates from last week to today

    // populate the array with the week's dates
    while (counterDate <= today){
        rangeOfDates.push(findDate(counterDate));// Push only the date and not the time to make it simpler
        counterDate.setDate(counterDate.getDate() + 1);
    }
    return rangeOfDates;
}

//function to get an array of days of the previous week
function getLastWeekDays(){

    // Dealing with the DAYS throughout the previous week

    const today = new Date();
    const lastweek = new Date(); // Created to store the date of 7 days ago
    lastweek.setDate(today.getDate() - 6);
    const dayOfWeek = today.getDay(); // Get the current day of the week in number form
    const dayOfLastWeek = lastweek.getDay();

    const rangeOfDays = [];

    let counterDay = dayOfLastWeek // variable used to control the loop below used to populate an array of days from last week to today

    while(counterDay !== dayOfWeek){
        if(counterDay === 7){
            counterDay = 0;
        }
        rangeOfDays.push(findDay(counterDay)); //convert to words before pushing
        counterDay += 1;
    }

    return rangeOfDays
}

//function to filter out the ouchButtonData to only return objects within the date range
function getFilteredData(data){

    let index = 0;
    const rangeOfDates = getLastWeekDates();
    const filteredData = []

    data.forEach((entry) => {

        while(index < rangeOfDates.length){
            if(findDate(entry.Time) === rangeOfDates[index]){
                filteredData.push(entry);
            }


            index = index + 1;
        }

        index = 0;
        
    });

    return filteredData;
}

function calculateChartData(data) {

    const rangeOfDates = getLastWeekDates();
    const rangeOfDays = getLastWeekDays();
    
    // Comparing the dates of the data and the dates in the predetermined range

    let index = 0; //variable used to control the loop below

    const rangeOfPresses = [0, 0, 0, 0, 0, 0, 0];

    
    data.forEach((entry) => {

        //every entry's Time attribute is checked against every date in range
        while(index < rangeOfDates.length){
            
            if(findDate(entry.Time) === rangeOfDates[index]){
                rangeOfPresses[index] += 1;
            }
            index = index + 1;
        } 

        //reset to refresh the while loop for the next iteration of entry
        index = 0;
        
    });

    const newChartData = {
        labels: rangeOfDays,
        datasets: [
            {
                label: "Number of Ouch Button Presses This Week",
                data: rangeOfPresses,
                links: rangeOfDates,
            },
        ],
    };

    return newChartData;
}


function calculateMostCommonTime(data) {
    // Get all the times in the given data

    const filteredData = getFilteredData(data);
    
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

//*format day back into datetime to use for individual day data display when bar chart is clicked
function formatDateToLabel(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  

function Client() {
    let { clientId } = useParams();
    const [clientData, setclientData] = useState(); 
    const [ouchButtonData, setouchButtonData] = useState([]); 
    const [therapistData, settherapistData] = useState([]); 
    const [chartData, setChartData] = useState(); 
    const [mostCommonTime, setMostCommonTime] = useState(); 
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [clientRes, ouchButtonRes, therapistRes] = await Promise.all([
              axios.get(`http://localhost:5000/clientdata/${clientId}`),
              axios.get(`http://localhost:5000/ouchbuttondata/${clientId}`),
              axios.get("http://localhost:5000/therapistdata"),
            ]);
    
            setclientData(clientRes.data);
            setouchButtonData(ouchButtonRes.data);
            settherapistData(therapistRes.data);

            const mostCommonTime = 7; 

            setChartData(calculateChartData(ouchButtonRes.data)); 
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
                    <h3 className="client-metric__heading">Most common time period button was pressed</h3>
                    {mostCommonTime ? <p>{mostCommonTime}</p> : <p>Loading...</p>}
                </div>

                {therapistData.map((item) => { return <div key={item.TherapistID}> {item.TherapistEmail} </div>})}
                </div>
        </div>
    ); 
}

export default Client;