import { React, useRef } from "react"; 
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function LineChart({ chartData }) {
    const options = {
        scales: {
            y: {
                ticks: {
                    stepSize: 1
                }
            }
        }
    }

    const chartRef = useRef();

    return (
        <Line data={chartData} options={options} ref={chartRef}></Line>
    )
}

export default LineChart; 