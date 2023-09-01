import React from "react"; 
import { Bar } from "react-chartjs-2";  
import { Chart as ChartJS } from "chart.js/auto"; 

function BarChart({ chartData }) {
    var chartOptions = {
        scales: {
            y: {
                ticks: {
                    stepSize: 1
                }
            }
        }
    }

    return (
        <Bar className="barchart" data={chartData} options={chartOptions} />
    )
}

export default BarChart; 