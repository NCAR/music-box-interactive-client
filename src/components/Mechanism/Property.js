import React from "react";
import { connect } from "react-redux";
import { addProperty } from "../../redux/actions";

const Property = (props) => {
  const property = props.property

  const handleAddProperty = (event) => {
    props.addProperty({ property: {
                          ...property,
                          value: event.target.value
                        },
                        speciesName: props.speciesName
                      });
  };

  return (
    <div className="input-group mb-3" property={property.name} data-type={property.data_type}>
      <div className="input-group-prepend">
        <span className="input-group-text">{property.name}</span>
      </div>
      <input type="text"
             className="form-control"
             placeholder="Property value"
             value={property.value}
             onChange={handleAddProperty}>
      </input>
    </div>
  );
};

export default connect(null, { addProperty })(Property);
