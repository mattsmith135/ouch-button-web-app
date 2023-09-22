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

//function to format an hour into am or pm
function formatAmPm(hour){

    let ampm = "AM";

    if(hour > 12){
        hour -= 12;
        ampm = "PM";
    }

    return hour + ampm;

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
 
//function to appropriately populate the chart data
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

    //This is the actual part where everything is taken and set to be used by the charts

        const newChartData = {
            labels: rangeOfDays, //Names of days under each bar
            datasets: [
                {
                    label: "Number of Ouch Button Presses This Week", 
                    data: rangeOfPresses, //how high each bar goes
                    links: rangeOfDates, //dates returned unique to each bar when the bar is clicked. To be used as dayId for the Daily component
                },
            ],
        };
    
        return newChartData;
        
}

//function to find the most common hour in an array
function calculateMostCommonTime(data) {
    // Get all the times in the given data

    const filteredData = getFilteredData(data);
    
    const hours = []; 

    // Put the hours of each of the filtered data in a list to sort and find the most common
    filteredData.forEach((entry) => {
        hours.push(findHour(entry.Time));
    });

    
    //sort into descending order to make it easier to find the most common time
    hours.sort((a,b) => b -a);

    let index = 0;
    let frequency = 1;
    let mostCommonFrequency = 1;
    let mostCommonTime = hours[0];

    
    while(index < [hours.length - 1]){

        if(hours[index] === hours[index + 1]){
            frequency += 1;

            if(frequency > mostCommonFrequency){
                mostCommonFrequency = frequency;
                mostCommonTime = hours[index];
            }
        }
        else{
            frequency = 1;
        }

        index += 1;
        
    }; 

    return mostCommonTime;
        
} 

function Client() {
    let { clientId } = useParams();
    const [clientData, setclientData] = useState(); 
    const [ouchButtonData, setouchButtonData] = useState([]); 
    const [therapistData, settherapistData] = useState([]); 
    const [chartData, setChartData] = useState(); 
    const [mostCommonTime, setMostCommonTime] = useState(); 
    const [error, setError] = useState(null)

    //taking the data from the database and sorting them where they need to go
    useEffect(() => {

        const fetchData = async () => {
        try {
            const [clientRes, ouchButtonRes, therapistRes] = await Promise.all([
            axios.get(`http://localhost:5000/clientdata/${clientId}`),
            axios.get(`http://localhost:5000/ouchbuttondata/${clientId}`),
            axios.get("http://localhost:5000/therapistdata"),
            ]);

            //DO NOT MOVE THIS CODE IT WILL BREAK THE CHART ON REFRESH IDK WHY. IT MUST BE AS EARLY AS POSSIBLE AFTER THE AXIOS STUFF
            setChartData(calculateChartData(ouchButtonRes.data));

            setclientData(clientRes.data); 
            setouchButtonData(ouchButtonRes.data);
            settherapistData(therapistRes.data);//not currently used
            
            // Calculate the most common time after setting ouchButtonData
            const mostCommonTime = calculateMostCommonTime(getFilteredData(ouchButtonRes.data)); 

            
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
                    {formatAmPm(mostCommonTime) ? <p>{formatAmPm(mostCommonTime)}</p> : <p>Loading...</p>}
                </div>
            </div>
        </div>
    ); 
}

export default Client;