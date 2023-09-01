import React from "react";

const Property = ({ property, addAction, speciesName }) => {
  const handleAddProperty = (event) => {
    addAction({ property: {
                          ...property,
                          value: event.target.value
                        },
                        speciesName: speciesName
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

export default Property;
