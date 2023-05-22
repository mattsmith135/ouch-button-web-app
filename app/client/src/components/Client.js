import { useState, useEffect } from "react"; 
import BarChart from "./BarChart";
import api from "../api/posts"; 

function Client({ clientId }) {
    const [clientData, setClientData] = useState(); 
    const [ouchButtonData, setOuchButtonData] = useState(); 
    const [chartData, setChartData] = useState(); 

    const [mostCommonTime, setMostCommonTime] = useState(); 

    useEffect(() => {
        const fetchClientData = async() => {
            try {
                const response = await api.get(`/api/get/client/${clientId}`); 
                setClientData(response.data); 
            } catch (err) {
                if (err.response) {
                    console.log(err.response.data); 
                    console.log(err.response.status); 
                    console.log(err.response.headers); 
                } else {
                    console.log(`Error: ${err.message}`); 
                }
            }
        }

        const fetchOuchButtonData = async () => {
            try {
                const response = await api.get(`/api/get/client/${clientId}/ouchbuttondata`); 
                setOuchButtonData(response.data); 
            } catch (err) {
                if (err.response) {
                    console.log(err.response.data); 
                    console.log(err.response.status); 
                    console.log(err.response.headers); 
                } else {
                    console.log(`Error: ${err.message}`); 
                }
            }
        }

        fetchClientData();
        fetchOuchButtonData(); 
    }, [])

    useEffect(() => {
        if (ouchButtonData) {
            const today = new Date(); 
            const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); 
            const filteredData = ouchButtonData.filter((entry) => {
                const entryDate = new Date(entry.Time); 
                return entryDate >= oneWeekAgo && entryDate <= today;
            });
            const ouchButtonEntryCounts = {}; 

            filteredData.forEach((entry) => {
                const entryDate = new Date(entry.Time); 
                const dayOfWeek = entryDate.getDay(); 
                if (ouchButtonEntryCounts[dayOfWeek]) {
                    ouchButtonEntryCounts[dayOfWeek] += 1; 
                } else {
                    ouchButtonEntryCounts[dayOfWeek] = 1; 
                }
            });

            const newChartData = {
                labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                datasets: [
                    {
                        label: "Number of Ouch Button Presses This Week",
                        data: Object.values(ouchButtonEntryCounts),
                    },
                ],
            }

            setChartData(newChartData); 

            //* Calculates the most common hour by sorting the 'timeOccurrences' object in descending order based on
            /*  the occurence count and then retrieving the key (hour) from the first element of the sorted array.
            */
            const timeOccurrences = {}; 
            filteredData.forEach((entry) => {
                const entryTime = new Date(entry.Time); 
                const hour = entryTime.getHours(); 
                if (timeOccurrences[hour]) {
                    timeOccurrences[hour] += 1; 
                } else {
                    timeOccurrences[hour] = 1;
                }
            });

            const sortedOccurrences = Object.entries(timeOccurrences).sort((a, b) => b[1] - a[1]);
            const mostCommonHour = sortedOccurrences[0][0]; 

            const mostCommonTimePeriod = formatAMPM(new Date().setHours(mostCommonHour)); 

            setMostCommonTime(mostCommonTimePeriod);

            return; 
        }
    }, [ouchButtonData]);
    
    var chartOptions = {
        scales: {
            y: {
                ticks: {
                    stepSize: 1
                }
            }
        }
    }

    const formatAMPM = (time) => {
        const hours = new Date(time).getHours(); 
        const minutes = new Date(time).getMinutes(); 
        const ampm = hours >= 12 ? "PM" : "AM"; 
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12; 
        const formattedMinutes = minutes.toString().padStart(2, "0");

        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    return (
        <div className="client">
            <div className="client-metrics">
                <div className="client-metric">
                    {chartData && <BarChart chartData={chartData} chartOptions={chartOptions} />}
                </div>
                <div className="client-metric">
                    <h3 className="client-metric__heading">Most common time period button was pressed</h3>
                    {mostCommonTime ? <p>{mostCommonTime}</p> : <p>Loading...</p>}
                </div>
            </div>
        </div>
    ); 
}

export default Client;