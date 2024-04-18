import React from "react";
import "./weather.style.css";

const Weather = props => {
    return (
        <div className="container text-light">
            <div className="cards pt-4"> {/** padding-top : 1rem */}
                <h1>
                    {props.cityName}
                </h1>
                <div className="row">
                  <h5 className="col-md-3 offset-md-3 py-4"> {/** padding-y-axis : 1rem */}
                    <i className={`wi ${props.weatherIcon} display-1`}/>

                    {props.temp_celsius ? (
                        <h1 className="py-2">{props.temp_celsius}&deg;</h1>
                    ): null}
                    {/** show max and min temperate */}
                    {minmaxTemp(props.temp_min, props.temp_max)}

                    <h4 className="py-3">{props.description}</h4>
                  </h5>
                  <div className="col-md-3 py-4">
                    <p className="py-3"> {props.clothing}</p>
                  </div>
                </div>
            </div>
        </div>
    );
};

function minmaxTemp(min,max) {
  if(min && max) {
    return(
      <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
    );    
  }
}

export default Weather;