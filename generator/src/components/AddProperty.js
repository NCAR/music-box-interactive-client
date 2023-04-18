import React, { useState } from "react";
import { connect } from "react-redux";
import { addProperty } from "../actions";

function AddProperty(props) {

  const handleAddProperty = (property) => {
    console.log("handleAddProperty", { ...property, speciesName: props.speciesName });
    props.addProperty({ ...property, speciesName: props.speciesName });
  };

  return (
    <div className="dropdown">
      <button className="btn btn-primary dropdown-toggle"
         type="button"
         id="new-property-dropdown"
         data-toggle="dropdown"
         aria-haspopup="true"
         aria-expanded="false">
        Add property
      </button>
      <div className="dropdown-menu" aria-labelledby="new-property-dropdown">
        <a className="dropdown-item"
           href="#"
           onClick={() => handleAddProperty({ name: "description",
                                              "data-type": "string",
                                              value: "" })}>
          description
        </a>
        <a className="dropdown-item"
           href="#"
           onClick={() => handleAddProperty({ name: "absolute convergence tolerance [mol mol-1]",
                                              "data-type": "number",
                                              value: 1e-12 })}>
          absolute convergence tolerance
        </a>
        <a className="dropdown-item"
           href="#"
           onClick={() => handleAddProperty({ name: "molecular weight [kg mol-1]",
                                              "data-type": "number",
                                              value: 0 })}>
          molecular weight
        </a>
        <a className="dropdown-item"
           href="#"
           onClick={() => handleAddProperty({ name: "fixed concentration",
                                              "data-type": "string",
                                              value: "CONSTANT" })}>
          fixed concentration
        </a>
      </div>
    </div>
  );
};

export default connect(null, { addProperty })(AddProperty);
