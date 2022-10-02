import './App.css';
import React, { useState } from 'react';
import {testModel} from './commands';

function App() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState("");
  const [hour, setHour] = useState();
  const [response, setResponse] = useState("");

  const locations = [ { key: 179, value: 'MIT Vassar St', capacity: 25},
  { key: 184, value: 'Sidney Research Campus/Erie Street at Waverly', capacity: 19},
  { key: 178, value: 'MIT Pacific St at Purrington St', capacity: 23},
  { key: 380, value: 'Mass Ave at Albany St', capacity: 18},
  { key: 67, value: 'MIT at Mass Ave / Amherst St', capacity: 67},
  { key: 80, value: 'MIT Stata Center at Vassar St / Main St', capacity: 80},
  { key: 566, value: 'Main Street/Albany Street/Technology Square', capacity: 23},
  { key: 479, value: 'Galileo Galilei Way at Main Street', capacity: 19},
  { key: 107, value: 'Ames St at Main St', capacity: 19},
  { key: 318, value: 'Ames St at Broadway', capacity: 19},
  { key: 471, value: 'MIT Carleton St at Amherst St', capacity: 27},
  { key: 472, value: 'MIT Hayward St at Amherst St', capacity: 27},
  { key: 189, value: 'Kendall T', capacity: 23},
  { key: 72, value: 'One Broadway / Kendall Sq at Main St / 3rd St', capacity: 23} ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
        <h1>When would you like to use a Blue Bike?</h1>

        <label for="location">Location:</label>
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

        <label for="hour">Hour:</label>
        <input
          id="hour"
          type="time"
          value={hour}
          onChange={(e) => { setHour(e.currentTarget.value);  }}
          required
        />
        <br/>

        <button type="submit">Submit</button>
      </form>

      <h3>{response}</h3>
    </div>
  );
}

export default App;
