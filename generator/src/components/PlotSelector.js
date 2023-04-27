import React, { useState } from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";

const PlotSelector = props => {

  const [units, setUnits] = useState(props.units && props.units.length ? props.units[0] : undefined)

  const handleChangeUnits = (newUnits) => {
    setUnits(newUnits);
  }

  return (
    <nav>
      <ul className="list-group bg-ncar-menu-secondary p-2">
        <div className="my-2">
          {props.units && props.units.length ?
            <>
            <div className="d-flex justify-content-between">
              Select plot units
            </div>
            <Dropdown className="d-inline-block w-100">
              <Dropdown.Toggle variant="success" className="btn btn-white w-100">
                {units}
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100">
                {props.units.map((unit, index) => {
                  return (
                    <Dropdown.Item href="#" key={`units-${index}`} onClick={() => handleChangeUnits(unit)}>
                      {unit}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
            </>: null}
        </div>
        <div className="d-flex justify-content-between">
          Select species to plot
        </div>
        {props.availablePlots.map((plot, index) => {
          return (
            <button className="sub_p list-group-item list-group-item-action"
                     subtype="normal"
                     key={`plot-${index}`}>
              {plot.label}
            </button>
          )
        })}
      </ul>
    </nav>
  )
}

export default connect()(PlotSelector)
