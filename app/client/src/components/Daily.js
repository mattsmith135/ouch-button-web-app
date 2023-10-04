import React from 'react'
import { useRef } from 'react'
import { useState, useEffect } from "react"; 
import axios from "axios";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Circle} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

//For this page, I'm not using a separate component to store the line chart because the passing of the current element when a point is clicked between two files is too difficult for my current skill level.
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

import { Line, getElementAtEvent } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

//function to extract just the hour from a datetime string
function findHour(dateTimeString) {
  const date = new Date(dateTimeString);
  const hour = date.getHours();
  return hour;
}

function getFilteredData(data, time){

  const filteredData = []

  data.forEach((entry) => {
    if(findHour(entry.Time) === time){
      filteredData.push(entry);
    }
  })
  return filteredData;
}

function formatAMPM(hour, minutes) {
  let ampm = "AM";

  if (hour > 12) {
    hour -= 12;
    ampm = "PM";
  }

  return `${hour}:${minutes} ${ampm}`;
}

function calculateChartData(data) {
  const times = [] //to store the times from the data into a list
  const sortedTimes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //to store the amount of times grouped into every 2 hours to be used to plot the chart

  //put only the hours into an array
  data.forEach((entry) => {
    times.push(findHour(entry.Time));
  });
  
  let labelIndex = 0;
  let sortedIndex = 0;

  const labelTimes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  times.forEach((entry) => {
    while(labelIndex < labelTimes.length){
      if(entry === labelTimes[labelIndex]){
        sortedTimes[labelIndex]++;
        break;
      }
      labelIndex++;
    }
    labelIndex = 0;
  })
    const newChartData = {
        labels: ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'], //The last one is empty because I still want to plot the ones before 12am the next day
        datasets: [
            {
                label: "Times the button was pressed", 
                data: sortedTimes, //how high each bar goes
            },
        ],
    };
    
    return newChartData;
}

//function to find the most common coordinate for the button presses at a specific hour
function findCoordinates(data) {

    const coordinates = []; //array used to store all coordinates
    const groups = []; //array used to store rough general locations and their frequency

    data.forEach((entry) => {
        coordinates.push([
            parseFloat(entry.Latitude), 
            parseFloat(entry.Longitude)
        ]);
    });

    let coordinateIndex = 1;
    let groupIndex = 0;

    while(coordinateIndex < coordinates.length) {
        let pointA = L.latLng(coordinates[coordinateIndex]);
        let pointB = pointA;
        let distance = 0;

        //If groups is empty, add the first coordinate and initialize the frequency
        if (groups.length === 0 ){
            groups.push([
                coordinates[coordinateIndex -1],
                1, //frequency
            ]);
        };


        //look through groups of locations
        while(groupIndex < groups.length){
            pointB = L.latLng(groups[groupIndex][0]);
            distance = pointA.distanceTo(pointB);

            //if the current coordinate is close to any one of the coordinates in groups, increase the frequency of that group
            if(distance < 100){
                groups[groupIndex][1]++;//increase the frequency
                break; //exit the loop if a match is found
                
            }
            //if it has reached the last coordinate in groups and still has not found a match, add it as a new coordinate to groups with a frequency of 1 as initialization
            if(groupIndex === groups.length - 1){
                groups.push([
                    coordinates[coordinateIndex],
                    1, //frequency initialized to 1

                ])
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

function Daily() {
  let { clientId } = useParams();
  let { dayId } = useParams();
  const [clientData, setclientData] = useState(); 
  const [ouchButtonData, setOuchButtonData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState();
  const [coordinates, setCoordinates] = useState();

  useEffect(() => {
    
    const fetchData = async () => {
      try {
          const [clientRes, ouchButtonRes] = await Promise.all([
              axios.get(`http://localhost:5000/clientdata/${clientId}`),
              axios.get(`http://localhost:5000/ouchbuttondata/${clientId}/${dayId}`)
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
      } catch (err) {
          setError(err.message);
      } finally {
          //now everything is loaded, render
          setLoading(false);
      }
    };
    fetchAndUpdateData();
  }, [coordinates]);


  //the chart options
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

  //This function handles the chart being clicked. Most of the comments are there because I learn best by writing down what i know as i understand it
  const onClick = (event) => {
    
    //This loop is here so that if you click anywhere other than the actual points, nothing will happen
    if(getElementAtEvent(chartRef.current, event).length > 0){

      const datasetIndexNum = getElementAtEvent(chartRef.current, event)[0].datasetIndex; //the index of the dataset of the point you clicked (which should always be 0 because there's only 1 dataset and 1 line)
      const dataPoint = getElementAtEvent(chartRef.current, event)[0].index; //the INDEX of the x-axis of the point that you clicked
      const data = chartData.datasets[datasetIndexNum].data[dataPoint] //the y-axis value of the point that you clicked

      //This loop makes sure that there was at least 1 button press recorded at point you're clicking so that there will be things to display on the map later
      if(data > 0){
        
        const filteredData = getFilteredData(ouchButtonData, dataPoint); //In this case, the index is the same as the values we want so I just use the index
        const coordinate = findCoordinates(filteredData);
        setCoordinates(coordinate);
      }
    }
  }

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
              {chartData && <Line data={chartData} options={options} onClick={onClick} ref={chartRef}></Line>}
            </div>
            <div>
              {coordinates && (
                <MapContainer center={coordinates} zoom={15}>
                  <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Circle center={coordinates} radius={100} pathOptions={{color: 'blue'}}/>
              </MapContainer>
              )}
            </div>
          </>
        )}
      </div>
    </div>

  )
}

export default Daily;