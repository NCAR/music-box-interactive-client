import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { addProperty, addAerosolProperty } from "../../redux/actions";

function AddProperty({ addProperty, speciesName, options} ) {

  const handleAddProperty = (property) => {
    addProperty({ property: property, speciesName: speciesName });
  };

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

const mapDispatchToProps = (dispatch, ownProps) => {
    const { type } = ownProps;

    let action = null;

    switch (type)
    {
        case 'aerosol':
            action = property => dispatch(addAerosolProperty(property))
            break;
        case 'gas':
            action = property => dispatch(addProperty(property))
            break;
    }
    
    return {
        addAction: action
    };
};

export default connect(null, mapDispatchToProps)(AddProperty);
