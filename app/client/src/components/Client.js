import React, { Component } from "react";
import Button from './Button';
import axios from 'axios';
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale
)

const Press = props => (
    <tr>
    <td>{props.press.OuchButtonDataID}</td>
    <td>{props.press.OuchButtonID}</td>
    <td>{props.press.Location}</td>
    <td>{props.press.ClientID}</td>
    <td>{props.press.Time}</td>
  </tr>
)

const BarChart = ({ data }) => {
    return(
        <div>
            <Bar
                data = {data}
                height={400}
                width={1800}
                
            />
        </div>
    )
}

class Client extends Component {
    constructor(props) {
        super(props); 

        this.state = {
            buttonData: [],
            patientData: [],
            therapistData: []
        };

        this.chartRef = React.createRef();
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/get/buttonData')
        .then(response => {
            this.setState({ buttonData: response.data });
            
        })
        .catch((error) => {
            console.log(error)
        })

        axios.get('http://localhost:5000/api/get/patientData')
        .then(response => {
            this.setState({ patientData: response.data })
        })
        .catch((error) => {
            console.log(error)
        })
        axios.get('http://localhost:5000/api/get/therapistData')
        .then(response => {
            this.setState({ therapistData: response.data })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    //return every single row of the ouchbuttondata table
    buttonDataList(){
        return this.state.buttonData.map(currentData => {
            return <Press press={currentData} key={currentData.OuchButtonDataID}/>;
        })
    }

    //List the rows that were added sometime in the past 7 days
    listLastWeekFrequency() {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        oneWeekAgo.setHours(0, 0, 0, 0); // Set time to 00:00:00 to consider only the date
      
        const lastWeekButtonData = this.state.buttonData.filter(currentData => {
          const currentTime = new Date(currentData.Time);
          currentTime.setHours(0, 0, 0, 0); // Set time to 00:00:00 to consider only the date
          return currentTime.getTime() >= oneWeekAgo.getTime(); // Compare timestamps instead of date objects
        });
      
        return lastWeekButtonData;
    }
    
    //List the actual calendar last 7 days
    listLastWeekDays(){
        const lastWeekDates = [];
        const today = new Date(); // Get the current date
        
        for (let i = 6; i >= 0; i--) {
            const currentDate = new Date(today);
            currentDate.setDate(currentDate.getDate() - i); // Subtract 'i' days from the current date
            
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
            const day = String(currentDate.getDate()).padStart(2, "0");
            
            const formattedDate = `${year}-${month}-${day}`; // Format the date as "YYYY-MM-DD"
            lastWeekDates.push(formattedDate);
        }
        
        return lastWeekDates;
    }
      
    //Get the total number of rows added sometime in the past 7 days
    getLastWeekFrequency(){
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        oneWeekAgo.setHours(0, 0, 0, 0);
      
        const weeklyFrequency = this.state.buttonData.reduce((frequency, currentData) => {
          const currentTime = new Date(currentData.Time);
          currentTime.setHours(0, 0, 0, 0);
      
          if (currentTime.getTime() >= oneWeekAgo.getTime()) {
            const currentWeek = currentTime.toISOString().slice(0, 10); // Get the date in YYYY-MM-DD format
      
            if (frequency[currentWeek]) {
              frequency[currentWeek] += 1; // Increment the count for the current week
            } else {
              frequency[currentWeek] = 1; // Initialize the count for a new week
            }
          }
      
          return frequency;
        }, {});
        
        return weeklyFrequency;
    }

    //return the day of the week given a date time
    getDayOfWeek(dateString) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dateParts = dateString.split(' ')[0].split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // Months are zero-based in JavaScript Date
        const day = parseInt(dateParts[2]);
        const date = new Date(year, month, day);
        const dayOfWeekIndex = date.getDay();
        return daysOfWeek[dayOfWeekIndex];
    }

    getBarData(weekArray, weekdays){

        const barData = [0, 0, 0, 0, 0, 0, 0];
        
        for(let i=0; i < 7; i++){
            for(let j=0; j < weekArray.length; j++){
                if(this.getDayOfWeek(weekArray[j].Time) == weekdays[i]){
                    barData[i] += 1;
                }
            }
        }

        return barData;
    }

    getHighestDayFrequency(chartData, weekdays){
        var highestDay = '';
        var highestValue = 0;
        var index = 0;
        for(let i=0; i < 7; i++){
            if(chartData[i] > highestValue){
                highestValue = chartData[i];
                index = i;
            }
        }
        highestDay = weekdays[index];
        return highestDay;
    }

    getMostCommonHour(dates) {
        const timeHours = [];
        const hourCount = {};
        var formattedHour = '';
        var ampm = '';
      
        dates.forEach(dateString => {
          const dateTime = new Date(dateString);
          const time = dateTime.getUTCHours(); // Extract the hour portion
      
          timeHours.push(time); // Add the hour to the array
        });
      
        timeHours.forEach(hour => {
          if (hourCount[hour]) {
            hourCount[hour]++;
          } else {
            hourCount[hour] = 1;
          }
        });
      
        let mostCommonHour;
        let maxCount = 0;
      
        // Find the hour with the maximum count
        for (const hour in hourCount) {
          const count = hourCount[hour];
          if (count > maxCount) {
            mostCommonHour = parseInt(hour);
            maxCount = count;
          }
        }

        //Format the hour
        if(mostCommonHour > 12){
            ampm = 'PM';
            mostCommonHour = mostCommonHour - 12
        }
        else{
            ampm = 'AM';
        }

        formattedHour = mostCommonHour + ampm;
      
        return formattedHour;
      }
            
    render() {

        //the full rows in the ouchbuttondata table that were added sometime within the last week
        const last7DatesRows = this.listLastWeekFrequency();

        //the days of the week of the last 7 days
        const last7Days = this.listLastWeekDays().map(data => this.getDayOfWeek(data));

        //the number of rows added sometimes within the last week
        const weeklyFrequency = Object.keys(this.getLastWeekFrequency()).length;

        //the array of the number of rows entered into the ouchbuttondata table for each day of the last7Days array
        const barData = this.getBarData(last7DatesRows, last7Days);

        //the day of the week with the highest number of presses
        const highestNumberDay = this.getHighestDayFrequency(barData, last7Days);

        //the hour of the week that had the most number of presses
        const highestHour = this.getMostCommonHour(last7DatesRows.map(data => data.Time));

        const chartData = {
            labels: last7Days,
            datasets: [{
              label: 'Testing label',
              data: barData,
            }],
            options: {
              legend: { display: false },
              title: {
                display: true,
                text: 'Latest 7 sample data'
              },
              scales: {
                y: { grace: '2%' }
              }
            }
          };
          

        return (
            <div className="client">
                <div className="client-bar">
                    <h1>Number of Button Presses this week:</h1>
                    <BarChart data={chartData} />
                </div>
                <div className="client-stats">
                    <div className="client-stats-contentbox">
                        <h1> This week, the day the button was pressed the most was:</h1>
                        <p className="client-stats-contentbox__stat">{highestNumberDay}</p>
                    </div>
                    <div className="client-stats-contentbox">
                        <h1> This most common time preiod the button was pressed is:</h1>
                        <p className="client-stats-contentbox__stat">{highestHour}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Client;