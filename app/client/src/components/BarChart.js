import React from "react"; 
import { useRef } from 'react';
import { useNavigate } from "react-router-dom"; 
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js/auto";
import { Bar, getElementsAtEvent } from "react-chartjs-2";  

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function BarChart({ chartData, clientId }) {
    var chartOptions = {
        scales: {
            y: {
                ticks: {
                    stepSize: 1
                }
            }
        }
    }

    const chartRef = useRef();
    const navigate = useNavigate(); 

    // To make the bars clickable and redirect to the Daily component
    const onClick = (event) => {

        if (getElementsAtEvent(chartRef.current, event).length > 0) {
            const datasetIndexNum = getElementsAtEvent(chartRef.current, event)[0].datasetIndex;
            const dataPoint = getElementsAtEvent(chartRef.current, event)[0].index;

            const dayId = chartData.datasets[datasetIndexNum].links[dataPoint];
            navigate(`/client/${clientId}/${dayId}`); 
        }

    }

    return (
        <Bar className="barchart" data={chartData} options={chartOptions} onClick={onClick} ref = {chartRef}/>
    )
}

export default BarChart; 