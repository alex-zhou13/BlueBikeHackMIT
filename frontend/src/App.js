import './App.css';
import React, { useState } from 'react';

const nearby_station_ids = new Array(179,184,178,380,67,80,566,479,107,318,471,472,189,72);
const nearby_station_names = new Array("MIT Vassar St","Sidney Research Campus/Erie Street at Waverly","MIT Pacific St at Purrington St",
"Mass Ave at Albany St","MIT at Mass Ave / Amherst St","MIT Stata Center at Vassar St / Main St","Main Street/Albany Street/Technology Square",
"Galileo Galilei Way at Main Street","Ames St at Main St","Ames St at Broadway","MIT Carleton St at Amherst St","MIT Hayward St at Amherst St",
"Kendall T","One Broadway / Kendall Sq at Main St / 3rd St");

function App() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState("");
  const [hour, setHour] = useState();
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setResponse("TBD");
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>When and where would you like to use a Blue Bike?</h1>

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
          <option>{nearby_station_names[0]}</option>
          <option>{nearby_station_names[1]}</option>
          <option>{nearby_station_names[2]}</option>
          <option>{nearby_station_names[3]}</option>
          <option>{nearby_station_names[4]}</option>
          <option>{nearby_station_names[5]}</option>
          <option>{nearby_station_names[6]}</option>
          <option>{nearby_station_names[7]}</option>
          <option>{nearby_station_names[8]}</option>
          <option>{nearby_station_names[9]}</option>
          <option>{nearby_station_names[10]}</option>
          <option>{nearby_station_names[11]}</option>
          <option>{nearby_station_names[12]}</option>
          <option>{nearby_station_names[13]}</option>
        </datalist>

        <label for="date">Enter date:</label>
        <input type="date" id="date" name="trip-start"
          value="2022-10-01"
          min="2022-10-01" max="2023-12-31"
          onChange={(e) => { setDate(e.currentTarget.value);  }}
          required
        />
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

      <h3>Predicted number of bikes: {response}</h3> <br/> 
      <h3>Probability of finding a bike: {response}</h3> <br/> 
      <h3>Predicted number of spots: {response}</h3> <br/> 
      <h3>Probability of finding a spot: {response}</h3> <br/> 

      <img class = "logo"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Bluebikes_Logo.svg/2560px-Bluebikes_Logo.svg.png"/>

    </div>
  );
}

export default App;
