import './App.css';
import React, { useState } from 'react';
import {testModel} from './commands';

function App() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState("");
  const [hour, setHour] = useState();
  const [response, setResponse] = useState("");

  const locations = [ { key: 179, value: 'MIT Vassar St' },
  { key: 184,
    value: 'Sidney Research Campus/Erie Street at Waverly' },
  { key: 178, value: 'MIT Pacific St at Purrington St' },
  { key: 380, value: 'Mass Ave at Albany St' },
  { key: 67, value: 'MIT at Mass Ave / Amherst St' },
  { key: 80, value: 'MIT Stata Center at Vassar St / Main St' },
  { key: 566,
    value: 'Main Street/Albany Street/Technology Square' },
  { key: 479, value: 'Galileo Galilei Way at Main Street' },
  { key: 107, value: 'Ames St at Main St' },
  { key: 318, value: 'Ames St at Broadway' },
  { key: 471, value: 'MIT Carleton St at Amherst St' },
  { key: 472, value: 'MIT Hayward St at Amherst St' },
  { key: 189, value: 'Kendall T' },
  { key: 72,
    value: 'One Broadway / Kendall Sq at Main St / 3rd St' } ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setResponse("80% Probability of 1 Bike");
    var locationId = locations.filter(function(item) {
      return item.value === location;
    })
    console.log(locationId[0].key)
    const [hourString, minute] = hour.split(":");
    var seconds = (parseInt(hourString) * 60) * 60
    seconds += parseInt(minute) * 60;
    const response = await testModel(locationId[0].key + date + seconds);
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

        {/* <label for="date">Start date:</label>
        <input type="date" id="date" name="trip-start"
          value="2022-10-01"
          min="2022-10-01" max="2023-12-31"
          onChange={(e) => { setDate(e.currentTarget.value);  }}
          required
        />
        <br/> */}
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
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((item, key) =>
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
