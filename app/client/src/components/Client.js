import { useState, useEffect } from "react"; 
import { MapContainer, TileLayer, Circle} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useParams } from "react-router-dom";
import BarChart from "./BarChart";
import axios from "axios";

// function to return just the date in a datetime string
//NOTE: THIS FUNCTION SOMEHOW CHANGES IT TO THE CURRENT TIMEZONE'S DATE AND NOT JUST EXTRACTS THE RAW DATE FROM THE DATABASE ENTRY. IDK WHY IT DOES THIS BUT IT'S WHAT WE WANT ANYWAY THEREFORE I WON'T CHANGE IT FOR NOW
function findDate(dateTimeString){
    const date = new Date(dateTimeString);

    //Format correctly
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

//fuction to return just the hour from a datetime string (auto converts to AEST time because of the Date() method)
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

    if(hour >= 12){
        if(hour > 12){
            hour -= 12;
        }
        
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

//function to return an array of button presses. 1 for each day of the week. Intended for use by calculateChartData() and maybe by another function that returns simply the highest amount of button presses in a day in the last week. This has not yet been implemented
function getArrayOfPresses(data, rangeOfDates){

    let index = 0; 
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

    return rangeOfPresses;
}
 
//function to appropriately populate the chart data
function calculateChartData(data) {

    const rangeOfDates = getLastWeekDates();
    const rangeOfDays = getLastWeekDays();
    const rangeOfPresses = getArrayOfPresses(getFilteredData(data), rangeOfDates);
    

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

//function to find the most common hour in an array of data
function calculateMostCommonTime(data) {

    const filteredData = getFilteredData(data);
    
    const hours = []; 

    // Put the hours of each of the data in a list to sort and find the most common
    filteredData.forEach((entry) => {
        hours.push(findHour(entry.Time));
    });

    //sort into descending order to make it easier to find the most common time
    hours.sort((a,b) => b -a);

    let index = 0;
    let frequency = 1;
    let mostCommonFrequency = 1;
    let mostCommonTime = hours[0];

    
    while(index < hours.length - 1){

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

//function to sort a list of coordinates into rough locations and their frequencies
function getMostCommonCoordinates(data) {
    const filteredData = getFilteredData(data);

    const coordinates = []; //array used to store all coordinates
    const groups = []; //array used to store rough general locations and their frequency

    filteredData.forEach((entry) => {
        coordinates.push([
            parseFloat(entry.Latitude), 
            parseFloat(entry.Longitude)
        ]);
    });

    let coordinateIndex = 0;
    let groupIndex = 0;

    while(coordinateIndex < coordinates.length) {
        let pointA = L.latLng(coordinates[coordinateIndex]);
        let pointB = pointA;
        let distance = 0;

        //If groups is empty, add the first coordinate and initialize the frequency
        if (groups.length === 0 ){
            groups.push([
                coordinates[coordinateIndex],
                1, //frequency
            ]);
        };


        //look through groups of locations
        while(groupIndex < groups.length){
            pointB = L.latLng(groups[groupIndex][0]);
            distance = pointA.distanceTo(pointB);
            console.log(pointA)
            console.log(pointB)

            //if the current coordinate is close to any one of the coordinates in groups, increase the frequency of that group
            if (distance < 100 && coordinateIndex > 0){
                groups[groupIndex][1]++;//increase the frequency
                break; //exit the loop if a match is found
                
            }
            //if it has reached the last coordinate in groups and still has not found a match, add it as a new coordinate to groups with a frequency of 1 as initialization
            if(groupIndex === groups.length - 1){
                groups.push([
                    coordinates[coordinateIndex],
                    1, //frequency initialized to 1

                ])
                break;
            }
            groupIndex++;
        }
        groupIndex = 0; //reset the inner loop
        coordinateIndex++;
        
    }

    let mostCommonFrequency = null;
    let mostCommonCoordinate = null;
    groups.forEach((entry) => {
        if(mostCommonFrequency === null || entry[1] > mostCommonFrequency){
            mostCommonFrequency = entry[1];
            mostCommonCoordinate = entry[0];
        }
    });

    groups.forEach((entry) => {
        if(entry[1] === mostCommonFrequency){
            mostCommonCoordinate = entry[0];
        }
    });

    console.log(mostCommonCoordinate);
    return mostCommonCoordinate;


}

//note to self: make ouchButtonData = getFilteredData(ouchButtonRes.data) because only the filtered data is used on this page
function Client() {
    let { clientId } = useParams();
    const [clientData, setclientData] = useState(); 
    const [ouchButtonData, setOuchButtonData] = useState();
    const [chartData, setChartData] = useState(); 
    const [mostCommonTime, setMostCommonTime] = useState(); 
    const [coordinates, setCoordinates] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); //used to force the website to wait until everything is loaded before attempting to render

    //taking the data from the database and sorting them where they need to go
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clientRes, ouchButtonRes] = await Promise.all([
                    axios.get(`http://localhost:5000/clientdata/${clientId}`),
                    axios.get(`http://localhost:5000/ouchbuttondata/${clientId}`)
                ]);
    
                return {
                    clientData: clientRes.data,
                    ouchButtonData: ouchButtonRes.data,
                };
            } catch (err) {
                throw new Error("Error fetching data.");
            }
        };
    
        const fetchAndUpdateData = async () => {

            //don't render yet
            setLoading(true);
    
            try {
                const { clientData, ouchButtonData } = await fetchData();
                setclientData(clientData);
                setOuchButtonData(ouchButtonData);
                setChartData(calculateChartData(ouchButtonData));
                setMostCommonTime(calculateMostCommonTime(ouchButtonData));
                setCoordinates(getMostCommonCoordinates(ouchButtonData));
            } catch (err) {
                setError(err.message);
            } finally {
                //now everything is loaded, render
                setLoading(false);
            }
        };
    
        fetchAndUpdateData();
    }, [clientId]);

    return (
        <div className="client">
          {loading ? (
            "Loading..."
          ) : (
            <>
              <div className="client-header">
                <h4 className="client-header__subheading">User</h4>
                {clientData ? (
                  <h1 className="client-header__heading">{clientData?.ClientName}</h1>
                ) : (
                  <h1 className="client-header__heading">Loading</h1>
                )}
              </div>
              <div className="client-content">
                <div className="client-metric">
                  {chartData && <BarChart chartData={chartData} clientId={clientId} />}
                </div>
                <div className="client-metric">
                  <h3 className="client-metric__heading">
                    This week, the button was pressed most between:
                  </h3>
                  {formatAmPm(mostCommonTime) ? (
                    <p>
                      {formatAmPm(mostCommonTime)} to{" "}
                      {formatAmPm(parseInt(mostCommonTime) + 1)}
                    </p>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
              <div className="client-metric">
                <h3 className="client-metric__heading">
                  The rough location where the button was pressed the most was:
                </h3>
                <MapContainer center={coordinates} zoom={15}>
                  <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {coordinates && (
                    <Circle center={coordinates} radius={100} pathOptions={{color: 'blue'}}/>
                  )}
                </MapContainer>
              </div>
            </>
          )}
        </div>
      );
      
}

export default Client;