import React, { useState } from "react";

const api = {
  key: process.env.REACT_APP_API_ID,
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  function dateBuilder(d) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  }

  return (
    <div className="app">
      <h1>Weather React App</h1>
      <div className="app-wrap">
        <header>
          <input
            type="text"
            autocomplete="off"
            className="search-box"
            placeholder="Search for a city..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </header>
        <main>
          {typeof weather.main != "undefined" ? (
            <div>
              <section className="location">
                <div className="city">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </section>
              <div className="current">
                <div className="weather-description">
                  <div className="weather-icon">
                    <img
                      src={require(`./icons/${weather.weather[0].icon}.png`)}
                      alt="image"
                    />
                  </div>
                  <hr />
                  <div className="weather">{weather.weather[0].main}</div>
                </div>
                <div className="temp">
                  {Math.round(weather.main.temp)}
                  <span>°c</span>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </main>
      </div>
      <h3>@codewithsparsh</h3>
    </div>
  );
}

export default App;
