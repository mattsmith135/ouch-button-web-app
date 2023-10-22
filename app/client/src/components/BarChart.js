import { React, useRef } from "react"; 
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js/auto";
import { Bar, getElementsAtEvent } from "react-chartjs-2";  

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function BarChart({ chartData, onChartClick }) {
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

    const onClick = (event) => {
        onChartClick(getElementsAtEvent(chartRef.current, event), chartData); 
    }

    return (
        <Bar className="barchart" data={chartData} options={chartOptions} onClick={onClick} ref={chartRef}/>
    )
}

export default BarChart; 