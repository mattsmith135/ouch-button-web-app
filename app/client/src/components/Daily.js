import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Map from "./Map";
import LineChart from "./LineChart";
import { findHour, findMostCommonCoordinates  } from './Utils';

function filterOuchButtonDataByHour(data, time) {
    const arr = []

    data.forEach((entry) => {
        if (findHour(entry.Time) === time) {
            arr.push(entry);
        }
    })

    return arr;
}

function calculateChartData(data) {
    const times = data.map(entry => findHour(entry.Time));
    const labelTimes = Array.from({ length: 24 }, (_, index) => index);
    const sortedTimes = new Array(24).fill(0);

    times.forEach(entry => {
        const index = labelTimes.indexOf(entry);
        if (index !== -1) {
            sortedTimes[index]++;
        }
    });

    const labels = labelTimes.map(hour => {
        const ampm = hour < 12 ? 'am' : 'pm';
        const displayHour = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour);
        return `${displayHour}${ampm}`;
    });

    const newChartData = {
        labels,
        datasets: [
        {
            label: 'Times the button was pressed',
            data: sortedTimes,
        },
        ],
    };

    return newChartData;
  }

function Daily() {
    let { clientId } = useParams();
    const [clientData, setClientData] = useState(); 
    const [ouchButtonData, setOuchButtonData] = useState();
    const [loading, setLoading] = useState();
    const [chartData, setChartData] = useState();
    const [coordinates, setCoordinates] = useState();

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
                setOuchButtonData(ouchButtonData);

                const chartData = calculateChartData(ouchButtonData);
                setChartData(chartData);

                if (chartData.datasets.length > 0) {
                    const dataPoint = chartData.datasets[0].data.findIndex(data => data > 0);
                    if (dataPoint >= 0) {
                        const filteredouchButtonData = filterOuchButtonDataByHour(ouchButtonData, chartData.labels[dataPoint]);
                        const coordinate = findMostCommonCoordinates(filteredouchButtonData);
                        setCoordinates(coordinate);
                    }
                  }
            } catch (err) {
                console.log(err.message); 
            } finally {
                // Now everything is loaded, render
                setLoading(false);
            }
        };
        
        fetchData();
    }, [clientId]);

    return (
        <div className="daily">
            <div className="client-content">
                {loading ? (
                "Loading"
                ) : (
                    <>
                    <div className="client-metric">
                        {clientData ? <p>{clientData.ClientName}</p> : <p>Loading</p>}
                    </div>
                    <div className="client-metric">
                        {chartData ? (
                            <LineChart chartData={chartData} />
                        ) : (
                            <p>Loading Chart Data</p>
                        )}
                    </div>
                    <div>
                        <Map coordinates={coordinates} zoom={15} radius={100} color={"blue"} />
                    </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Daily;