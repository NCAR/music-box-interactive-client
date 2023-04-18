import React, { useState } from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { addProperty } from "../redux/actions";

function AddProperty(props) {

  const handleAddProperty = (property) => {
    console.log("handleAddProperty", { ...property, speciesName: props.speciesName });
    props.addProperty({ ...property, speciesName: props.speciesName });
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" className="btn btn-primary">
        Add property
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
           href="#"
           onClick={() => handleAddProperty({ name: "description",
                                              "data-type": "string",
                                              value: "" })}>
          description
        </Dropdown.Item>
        <Dropdown.Item
           href="#"
           onClick={() => handleAddProperty({ name: "absolute convergence tolerance [mol mol-1]",
                                              "data-type": "number",
                                              value: 1e-12 })}>
          absolute convergence tolerance
        </Dropdown.Item>
        <Dropdown.Item
           href="#"
           onClick={() => handleAddProperty({ name: "molecular weight [kg mol-1]",
                                              "data-type": "number",
                                              value: 0 })}>
          molecular weight
        </Dropdown.Item>
        <Dropdown.Item
           href="#"
           onClick={() => handleAddProperty({ name: "fixed concentration",
                                              "data-type": "string",
                                              value: "CONSTANT" })}>
          fixed concentration
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default connect(null, { addProperty })(AddProperty);
