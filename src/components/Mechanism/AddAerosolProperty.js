import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { addAerosolProperty } from "../../redux/actions";

function AddAerosolProperty(props) {

  const handleAddAerosolProperty = (property) => {
    props.addAerosolProperty({ property: property, speciesName: props.speciesName });
  };

  let options = [
    {
      displayName: "description",
      name: "description",
      "data-type": "string",
      value: ""
    },
    {
      displayName: "absolute convergence tolerance",
      name: "absolute convergence tolerance [mol mol-1]",
      "data-type": "number",
      value: 1e-12
    },
    {
      displayName: "molecular weight",
      name: "molecular weight [kg mol-1]",
      "data-type": "number",
      value: 0
    },
    {
      displayName: "fixed concentration",
      name: "fixed concentration",
      "data-type": "string",
      value: "CONSTANT"
    },
    {
        displayName: "density",
        name: "density",
        "data-type": "number",
        value: 0
    },
    {
        displayName: "kappa",
        name: "kappa",
        "data-type": "number",
        value: 0
    }
  ]

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" className="btn btn-primary">
        Add property
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {
          options.map(({ displayName, ...option }, index) => {
            return (
              <Dropdown.Item
                key={index}
                href="#"
                onClick={() => handleAddAerosolProperty(option)}>
                {displayName}
              </Dropdown.Item>
            )
          }
          )
        }
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default connect(null, { addAerosolProperty })(AddAerosolProperty);
