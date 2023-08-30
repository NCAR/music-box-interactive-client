import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { addAerosolProperty } from "../../redux/actions";
import { shared_properties } from "./shared_properties"

function AddAerosolProperty(props) {

  const handleAddAerosolProperty = (property) => {
    props.addAerosolProperty({ property: property, speciesName: props.speciesName });
  };

  let options = [
    ...shared_properties,
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
  console.log(options)

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
