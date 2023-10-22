import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BarChart from "./BarChart";
import Map from "./Map"; 
import { findMostCommonCoordinates, getLastWeekDays, getLastWeekDates, formatAMPM } from "./Utils";

function formatDate(dateTimeString, format) {
    const date = new Date(dateTimeString);
  
    if (format === "date") {
        return date.toISOString().split("T")[0];
    } else if (format === "hour") {
        return String(date.getHours()).padStart(2, "0");
    } else if (format === "day") {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return daysOfWeek[date.getDay()];
    }
}

function filterOuchButtonDataByDateRange(data) {
    const rangeOfDates = getLastWeekDates();
    return data.filter(entry => rangeOfDates.includes(formatDate(entry.Time, "date")));
}

// Returns an array of button presses. 1 for each day of the week. 
function getArrayOfPresses(data, rangeOfDates) {
    return rangeOfDates.map(date =>
        data.filter(entry => formatDate(entry.Time, "date") === date).length
    );
}
 
// Calculates chart data to be displayed on the barchart
function calculateChartData(data) {
    const rangeOfDates = getLastWeekDates();
    const rangeOfDays = getLastWeekDays();
    const rangeOfPresses = getArrayOfPresses(data, rangeOfDates);
  
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

// Calculates the most common hour in an array of data
function calculateMostCommonTime(data) {
    const hours = data.map(entry => formatDate(entry.Time, "hour"));
    
    let mostCommonTime = null;
    let mostCommonFrequency = 0;
  
    for (let i = 0; i < hours.length; i++) {
        let frequency = 1;

        for (let j = i + 1; j < hours.length; j++) {
            if (hours[i] === hours[j]) {
                frequency++;
            }
        }

        if (frequency > mostCommonFrequency) {
            mostCommonFrequency = frequency;
            mostCommonTime = hours[i];
        }
    }
  
    return mostCommonTime;
}

function Client() {
    let { clientId } = useParams();
    const navigate = useNavigate(); 
    const [clientData, setClientData] = useState(); 
    const [ouchButtonData, setOuchButtonData] = useState();
    const [chartData, setChartData] = useState(); 
    const [mostCommonTime, setMostCommonTime] = useState(); 
    const [coordinates, setCoordinates] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
    
            try {
                const [clientRes, ouchButtonRes] = await Promise.all([
                    axios.get(`http://localhost:5000/clientdata/${clientId}`),
                    axios.get(`http://localhost:5000/ouchbuttondata/${clientId}`)
                ]);

                var clientData = clientRes.data; 
                var ouchButtonData = ouchButtonRes.data; 

                setClientData(clientData);

                ouchButtonData = filterOuchButtonDataByDateRange(ouchButtonData); 
                 
                setOuchButtonData(ouchButtonData);
                setChartData(calculateChartData(ouchButtonData));
                setMostCommonTime(calculateMostCommonTime(ouchButtonData));
                setCoordinates(findMostCommonCoordinates(ouchButtonData.map(entry => [
                    parseFloat(entry.Latitude),
                    parseFloat(entry.Longitude)
                ])));
            } catch (err) {
                console.log(err.message); 
            } finally {
                // Now everything is loaded, render
                setLoading(false);
            }
        };
    
        fetchData();
    }, [clientId]);

    const handleChartClick = (event, chartData) => {
        if (event.length > 0) {
            const datasetIndexNum = event[0].datasetIndex;
            const dataPoint = event[0].index;

            const dayId = chartData.datasets[datasetIndexNum].links[dataPoint];
            navigate(`/client/${clientId}/${dayId}`);
        }
    };

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
                        {chartData && <BarChart chartData={chartData} clientId={clientId} onChartClick={handleChartClick} />}
                    </div>
                    <div className="client-metric">
                        <h3 className="client-metric__heading">This week, the button was pressed most between:</h3>
                        {formatAMPM(mostCommonTime) ? (
                            <p>{formatAMPM(parseInt(mostCommonTime))} to {formatAMPM(parseInt(mostCommonTime) + 1)}</p>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <div className="client-metric">
                        <h3 className="client-metric__heading">The rough location where the button was pressed the most was:</h3>
                        <Map coordinates={coordinates} zoom={15} radius={100} color={"blue"} />
                    </div>
                </div>
            </>
            )}
        </div>
    );
}

export default Client;