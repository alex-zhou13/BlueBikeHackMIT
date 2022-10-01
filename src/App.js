import './App.css';
import React, { useState } from 'react';

function App() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState("");
  const [hour, setHour] = useState();
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setResponse("80% Probability of 1 Bike");
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
          <option>GSU</option>
          <option>Boston University West</option>
          <option>Boston University East</option>
          <option>Warren Towers</option>
        </datalist>

        <label for="date">Start date:</label>
        <input type="date" id="date" name="trip-start"
          value="2022-10-01"
          min="2022-10-01" max="2023-12-31"
          onChange={(e) => { setDate(e.currentTarget.value);  }}
          required
        />
        <br/>

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
