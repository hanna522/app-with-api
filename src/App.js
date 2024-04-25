import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";

import Weather from "./app_component/weather.component";
import Form from "./app_component/form.component";

const API_key = "429736441cf3572838aa10530929f7cd";

//api call https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

function App() {
  const [weatherState, setWeatherState] = useState({
    city: undefined,
    country: undefined,
    icon: undefined,
    clothing: undefined,
    main: undefined,
    celsius: undefined,
    temp_max: undefined,
    temp_min: undefined,
    description: "",
    error: false,
  });

  const weatherIcon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog"
  };

  const get_ClothingInfo = (tem) => {
    if (tem >= 28) return "sleeveless, shorts";
    else if (tem >= 23) return "half-sleeve, cotton pants";
    else if (tem >= 20) return "long-sleeve, cotton pants";
    else if (tem >= 17) return "thin cardigan, hoodie, jeans";
    else if (tem >= 12) return "jacket, cardigan, jeans";
    else if (tem >= 9) return "trench coat, jumper, jeans";
    else if (tem >= 5) return "wool coat, thick pants";
    else if (tem < 5) return "padded jacket, thick pants, muffler, gloves";
    else return "warm clothes";
  };

  const get_WeatherIcon = (icons, rangeId) => {
    let icon;

    if (rangeId >= 200 && rangeId < 232) icon = icons.Thunderstorm;
    else if (rangeId >= 300 && rangeId <= 321) icon = icons.Drizzle;
    else if (rangeId >= 500 && rangeId <= 521) icon = icons.Rain;
    else if (rangeId >= 600 && rangeId <= 622) icon = icons.Snow;
    else if (rangeId >= 701 && rangeId <= 781) icon = icons.Atmosphere;
    else if (rangeId === 800) icon = icons.Clear;
    else icon = icons.Clouds;
    
    return icon;
  }

  const calCelsius = (temp) => Math.floor(temp - 273.15);

  const getWeather = async (e) => {
    e.preventDefault();
    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    if (city && country) {
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
      );

      const response = await api_call.json();
            console.log(response);

      if (response.cod !== 200) {
        setWeatherState(prev => ({ ...prev, error: true }));
      } else {
        const tempCelsius = calCelsius(response.main.temp);
        setWeatherState({
          city: `${response.name}, ${response.sys.country}`,
          country: response.sys.country,
          clothing: get_ClothingInfo(tempCelsius),
          main: response.weather[0].main,
          celsius: tempCelsius,
          temp_max: calCelsius(response.main.temp_max),
          temp_min: calCelsius(response.main.temp_min),
          description: response.weather[0].description,
          error: false,
          icon: get_WeatherIcon(weatherIcon, response.weather[0].id),
        });
      }

    } else {
        setWeatherState(prev => ({ ...prev, error: true }));
    }
  };

  return (
    <main className="App">
      <Form loadWeather={getWeather} error={weatherState.error} />
      <Weather
        cityName={weatherState.city}
        weatherIcon={weatherState.icon}
        clothing={weatherState.clothing}
        temp_celsius={weatherState.celsius}
        temp_max={weatherState.temp_max}
        temp_min={weatherState.temp_min}
        description={weatherState.description}
      />
    </main>
  );
}

export default App;
