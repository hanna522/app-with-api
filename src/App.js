import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";

import Weather from "./app_component/weather.component";
import Form from "./app_component/form.component";

const API_key = "429736441cf3572838aa10530929f7cd";

//api call https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
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
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  }

  get_ClothingInfo(tem) {
    switch (true) {
      case tem >= 28:
        return "sleeveless, shorts";
      case tem >= 23 && tem < 28:
        return "half-sleeve, cotton pants";
      case tem >= 20 && tem < 23:
        return "long-sleeve, cotton pants";
      case tem >= 17 && tem < 19:
        return "thin cardigan, hoodie, jeans";
      case tem >= 12 && tem < 17:
        return "jacket, cardigan, jeans";
      case tem >= 9 && tem < 12:
        return "trench coat, jumper, jeans";
      case tem >= 5 && tem < 9:
        return "wool coat, thick pants";
      case tem < 5:
        return "padded jacket, thick pants, muffler, gloves";
      default:
        return "warm clothes";
    }
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  getWeather = async (e) => {
    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    if (city && country) {
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
      );

      const response = await api_call.json();

      if (response.cod !== 200) {
        this.setState({
          error: true,
        });
      } else {
        const tempCelsius = this.calCelsius(response.main.temp);
        this.setState({
          city: `${response.name}, ${response.sys.country}`,
          country: response.sys.country,
          clothing: this.get_ClothingInfo(tempCelsius),
          main: response.weather[0].main,
          celsius: tempCelsius,
          temp_max: this.calCelsius(response.main.temp_max),
          temp_min: this.calCelsius(response.main.temp_min),
          description: response.weather[0].description,
          error: false,
        });

        this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
      }
      console.log(response);
    } else {
      this.setState({
        error: true,
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error} />
        <Weather
          cityName={this.state.city}
          weatherIcon={this.state.icon}
          clothing={this.state.clothing}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
        />
      </div>
    );
  }
}

export default App;
