import { useState, useEffect } from "react"; 
import { MapContainer, TileLayer, Circle} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useParams } from "react-router-dom";
import BarChart from "./BarChart";
import axios from "axios";

// Extracts current timezone data
// Note that this function also changes the current timezone date!
function findDate(dateTimeString) {
    const date = new Date(dateTimeString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

// Returns the hour from a datetime string (auto converts to AEST time because of the Date() method)
function findHour(dateTimeString) {
    const date = new Date(dateTimeString);
    const hour = String(date.getHours()).padStart(2, "0");
    return `${hour}`;
}

// Returns the day of the week as a string based on weekday number input  
function findDay(number) {
    if(number === 0) {
        return "Sunday";
    }
    else if(number === 1) {
        return "Monday";
    }
    else if(number === 2) {
        return "Tuesday";
    }
    else if(number === 3) {
        return "Wednesday";
    }
    else if(number === 4) {
        return "Thursday";
    }
    else if(number === 5) {
        return "Friday";
    }
    else {
        return "Saturday";
    }
}

// Returns array of dates in previous week
function getLastWeekDates() {
    const today = new Date(); 

    const lastweek = new Date(); 
    lastweek.setDate(today.getDate() - 6);

    const rangeOfDates = []; 

    let counterDate = new Date(lastweek); 

    // Populate the 'rangeOfDates' array with the week's dates
    while (counterDate <= today) {
        rangeOfDates.push(findDate(counterDate));
        counterDate.setDate(counterDate.getDate() + 1);
    }
    return rangeOfDates;
}

// Returns array of days of the previous week
function getLastWeekDays() {
    const today = new Date();
    const lastweek = new Date(); 
    lastweek.setDate(today.getDate() - 6);
    const dayOfWeek = today.getDay(); // Obtains the current day of the week in number form
    const dayOfLastWeek = lastweek.getDay();

    const rangeOfDays = [];

    let counterDay = dayOfLastWeek 

    // Populate the 'rangeOfDays' array with the week's days
    while (counterDay !== dayOfWeek) {
        if (counterDay === 7) {
            counterDay = 0;
        }
        rangeOfDays.push(findDay(counterDay)); // Convert to string before pushing
        counterDay += 1;
    }
    return rangeOfDays
}

function formatAmPm(hour) {

    let ampm = "AM";

    if (hour > 12) {
        hour -= 12;
        ampm = "PM";
    }

    return hour + ampm;

}

// Filters the ouchButtonData to only return objects within the date range
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

// Returns an array of button presses. 1 for each day of the week. 
// Not yet implemented
function getArrayOfPresses(data, rangeOfDates) {
    let index = 0; 
    const rangeOfPresses = [0, 0, 0, 0, 0, 0, 0];

    data.forEach((entry) => {
        // Every entry's Time attribute is checked against every date in range
        while (index < rangeOfDates.length) {
            
            if (findDate(entry.Time) === rangeOfDates[index]) {
                rangeOfPresses[index] += 1; 
            }
            index = index + 1;
        } 

        index = 0;
    });

    return rangeOfPresses;
}
 
// Calculates chart data to be displayed on the barchart
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

// Calculates the most common hour in an array of data
function calculateMostCommonTime(data) {

    const filteredData = getFilteredData(data);
    
    const hours = []; 

    // Put the hours of each of the data in a list to sort and find the most common
    filteredData.forEach((entry) => {
        hours.push(findHour(entry.Time));
    });

    // Sort into descending order to make it easier to find the most common time
    hours.sort((a,b) => b -a);

    let index = 0;
    let frequency = 1;
    let mostCommonFrequency = 1;
    let mostCommonTime = hours[0];

    
    while (index < hours.length - 1) {

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

// Sorts a list of coordinates into rough locations and their frequencies
function getMostCommonCoordinates(data) {
    const filteredData = getFilteredData(data);

    const coordinates = [];
    const groups = []; // Array used to store rough general locations and their frequency

    filteredData.forEach((entry) => {
        coordinates.push([
            parseFloat(entry.Latitude), 
            parseFloat(entry.Longitude)
        ]);
    });

    let coordinateIndex = 0;
    let groupIndex = 0;

    while (coordinateIndex < coordinates.length) {
        let pointA = L.latLng(coordinates[coordinateIndex]);
        let pointB = pointA;
        let distance = 0;

        // If groups is empty, add the first coordinate and initialize the frequency
        if (groups.length === 0 ) {
            groups.push([
                coordinates[coordinateIndex -1],
                1, // frequency
            ]);
        };


        // Iterate over groups of locations
        while (groupIndex < groups.length) {
            pointB = L.latLng(groups[groupIndex][0]);
            distance = pointA.distanceTo(pointB);
            console.log(pointA)
            console.log(pointB)

            // If the current coordinate is close to any one of the coordinates in groups, increase the frequency of that group
            if (distance < 100) {
                groups[groupIndex][1]++;
                break; // Exit the loop if a match is found
                
            }

            // If it has reached the last coordinate in groups and still has not found a match, add it as a new coordinate to groups with a frequency of 1 as initialization
            if (groupIndex === groups.length - 1) {
                groups.push([
                    coordinates[coordinateIndex],
                    1, // frequency initialized to 1

                ])
                break;
            }
            groupIndex++;
        }
        groupIndex = 0;
        coordinateIndex++;
        
    }

    let mostCommonFrequency = null;
    let mostCommonCoordinate = null;
    groups.forEach((entry) => {
        if (mostCommonFrequency === null || entry[1] > mostCommonFrequency) {
            mostCommonFrequency = entry[1];
            mostCommonCoordinate = entry[0];
        }
    });

    groups.forEach((entry) => {
        if (entry[1] === mostCommonFrequency) {
            mostCommonCoordinate = entry[0];
        }
    });

    console.log(mostCommonCoordinate);
    return mostCommonCoordinate;


}

function Client() {
    let { clientId } = useParams();
    const [clientData, setclientData] = useState(); 
    const [ouchButtonData, setOuchButtonData] = useState();
    const [chartData, setChartData] = useState(); 
    const [mostCommonTime, setMostCommonTime] = useState(); 
    const [coordinates, setCoordinates] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); //used to force the website to wait until everything is loaded before attempting to render

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
                // Now everything is loaded, render
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
                </div>
            </>
            )}
        </div>
    );
}

export default Client;