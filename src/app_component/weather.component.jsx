import React from "react";
import "./weather.style.css";

const Weather = (props) => {
  return (
    <article className="container text-light">
      <div className="cards pt-4">
        {/** padding-top : 1rem */}
        <header>
          <h1>{props.cityName}</h1>
        </header>
        <div className="row">
          <div className="col-md-3 offset-md-3 py-4">
            {/** padding-y-axis : 1rem */}
            <i className={`wi ${props.weatherIcon} display-1`} />
            {props.temp_celsius ? (
              <h2 className="py-2">{props.temp_celsius}&deg;</h2>
            ) : null}
            <h3 lassName="py-3">{minmaxTemp(props.temp_min, props.temp_max)}</h3>
            <h3 className="py-3">{props.description}</h3>
          </div>
          <div className="col-md-3 py-4">
            <h3 className="py-3"> {props.clothing}</h3>
          </div>
        </div>
      </div>
    </article>
  );
};

function minmaxTemp(min, max) {
  if (min && max) {
    return (
      <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
    );
  }
}

export default Weather;
