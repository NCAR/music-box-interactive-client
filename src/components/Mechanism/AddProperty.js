import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { addProperty } from "../../redux/actions";
import { shared_properties } from "./shared_properties"

function AddProperty(props) {

  const handleAddProperty = (property) => {
    props.addProperty({ property: property, speciesName: props.speciesName });
  };

  let options = [
    ...shared_properties
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
                onClick={() => handleAddProperty(option)}>
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

export default connect(null, { addProperty })(AddProperty);
