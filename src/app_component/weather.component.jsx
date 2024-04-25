import React from "react";
import "./weather.style.css";

const Weather = (props) => {
  return (
    <article className="container text-light">
      <div className="cards pt-4">
        <header>
          <h1>{props.cityName}</h1>
        </header>

        <div className="row">
          <div className="temperature col-md-3 offset-md-3 py-4">
            <i
              className={`wi ${props.weatherIcon} display-1`}
              role="img"
              aria-label="Weather Icon"
            />

            {props.temp_celsius ? (
              <div className="temperature current-temperature">
                <p>{props.temp_celsius}&deg;</p>
              </div>
            ) : null}

            <div className="temperature description">
              <p>{props.description}</p>
            </div>

            <div className="row">
              <div className="temperature min-temperature col-md-6">
                <h2>min</h2>
                <p>{props.temp_min}&deg;</p>
              </div>

              <div className="temperature max-temperature col-md-6">
                <h2>max</h2>
                <p>{props.temp_min}&deg;</p>
              </div>
            </div>
          </div>

          <div className="clothing col-md-3 py-4">
            <h2>Clothing</h2>
            <p>{props.clothing}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Weather;
