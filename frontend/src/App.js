import './App.css';
import React, { useState } from 'react';
import {testModel} from './commands';

const nearby_station_ids = new Array(179,184,178,380,67,80,566,479,107,318,471,472,189,72);
const nearby_station_names = new Array("MIT Vassar St","Sidney Research Campus/Erie Street at Waverly","MIT Pacific St at Purrington St",
"Mass Ave at Albany St","MIT at Mass Ave / Amherst St","MIT Stata Center at Vassar St / Main St","Main Street/Albany Street/Technology Square",
"Galileo Galilei Way at Main Street","Ames St at Main St","Ames St at Broadway","MIT Carleton St at Amherst St","MIT Hayward St at Amherst St",
"Kendall T","One Broadway / Kendall Sq at Main St / 3rd St");

const nearby_stations = [
  {id: 179, name: "MIT Vassar St"},
  {id: 184, name: "Sidney Research Campus/Erie Street at Waverly"},
  {id: 178, name: "MIT Pacific St at Purrington St"},
  {id: 380, name: "Mass Ave at Albany St"},
  {id: 67, name: "MIT at Mass Ave / Amherst St"},
  {id: 80, name: "MIT Stata Center at Vassar St / Main St"},
  {id: 566, name: "Main Street/Albany Street/Technology Square"},
  {id: 479, name: "Galileo Galilei Way at Main Street"},
  {id: 107, name: "Ames St at Main St"},
  {id: 318, name: "Ames St at Broadway"},
  {id: 471, name: "MIT Carleton St at Amherst St"},
  {id: 472, name: "MIT Hayward St at Amherst St"},
  {id: 189, name: "Kendall T"},
  {id: 72, name: "One Broadway / Kendall Sq at Main St / 3rd St"},
];

function App() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState("");
  const [hour, setHour] = useState();
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert location to station
    const locationQuery = locations.filter(function(item) {
      return item.value === location;
    })
    const stationJson = locationQuery[0];

    // Convert time to sconds
    const [hourString, minute] = hour.split(":");
    var seconds = (parseInt(hourString) * 60) * 60
    seconds += parseInt(minute) * 60;

    // Convert date to int
    const dayOfWeek = days.findIndex(obj => obj === date);

    const response = await testModel(stationJson.key, stationJson.value, dayOfWeek, seconds, stationJson.capacity);
    setResponse(response.data);
  }



  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <br />
        <h1>When and where would you like to use a BlueBike?</h1> <br/>

        <label for="location">Select location:</label>
        <input
          type='text'
          onChange={(event) => {setLocation(event.target.value) }}
          placeholder='Location'
          list="places"
          id="location"
          required
        />
        <datalist id="places">
          {locations.map((item, key) =>
            <option key={item.key} value={item.value} />
          )}
        </datalist>

        

        <label for="date">Day:</label>
        <input
          type='text'
          onChange={(event) => {setDate(event.target.value) }}
          placeholder='Day of Week'
          list="days"
          id="date"
          required
        />
        <datalist id="days">
          {days.map((item, key) =>
            <option key={key} value={item} />
          )}
        </datalist>
        <br/>

        <label for="hour">Enter time:</label>
        <input
          id="hour"
          type="time"
          value={hour}
          onChange={(e) => { setHour(e.currentTarget.value);  }}
          required
        />
        <br/>
        <br/>

        <button type="submit">Submit</button>
      </form>

      <div class = "grid-container">
        <div class="grid-item">
          <img class = "bike" src = {bikePic} alt = "Bike!"/>
        </div>
        <div class="grid-item">
          <h3>Predicted number of bikes: {response.slice(0)}</h3> <br/> 
          <h3>Probability of finding a bike: {response.slice(1,23)}</h3> <br/> 
          <h3>Predicted number of spots: {response.slice(-2,-1)}</h3> <br/> 
          <h3>Probability of finding a spot: {1-parseFloat(response.slice(1,23))}</h3> <br/> 
        </div>
        <div class="grid-item">
          <img class = "bike" src = {bikePic} alt = "Bike!"/>
        </div>
      </div>

      <img class = "logo"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Bluebikes_Logo.svg/2560px-Bluebikes_Logo.svg.png" alt = "BlueBikes!"/>

    </div>
  );
}

export default App;
