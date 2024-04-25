import React from "react";
import "./form.style.css";

const Form = (props) => {
  return (
    <section className="container text-light">
      {props.error ? error() : ""}
      <form onSubmit={props.loadWeather}>
        <div className="row">
          <div className="col-md-3 offset-md-2 py-4">
            {/** col: 3/12, front empty row: 2 */}
            <input
              type="text"
              className="form-control"
              name="city"
              autoComplete="off"
              placeholder="City"
            />
          </div>
          <div className="col-md-3 py-4">
            <input
              type="text"
              className="form-control"
              name="country"
              autoComplete="off"
              placeholder="Country"
            />
          </div>
          <div className="col-md-3 mt-md-0 text-md-left py-4">
            <button className="btn btn-warning">Get Weather</button>
          </div>
        </div>
      </form>
    </section>
  );
};

function error() {
  return (
    <aside className="alert alert-danger mx-5" role="alert">
      Valid City and Country is Required
    </aside>
  );
}

export default Form;
