import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Property from "./Property";
import AddProperty from "./AddProperty";
import { aerosol_options, gas_options } from "./shared_properties"
import { getMechanism } from "../../redux/selectors";
import { addProperty, addAerosolProperty } from "../../redux/actions";

function PropertyList({ options, properties, speciesName, type, addAction }) {
  const [localProperties, setLocalProperties] = useState([]);

  useEffect(() => {
    const sortedProperties = [...properties].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    );
    setLocalProperties(sortedProperties);
  }, [properties]);

  return (
    <div className="form-group properties">
      {
        localProperties?.map(property => {
          return <Property key={property.name}
                           property={property}
                           speciesName={speciesName}
                           addAction={addAction}
                           />;
        })
      }
      <AddProperty type={type} speciesName={speciesName} options={options} addAction={addAction}/>
      <p>
      You may specify any property you like, but this is only <em>necessary</em> under certain circumstances (i.e., when the species participates in a reaction that requires the property be set). You will be prompted to set the property when it is required.
      </p>
    </div>
  );
};


const mapStateToProps = (state, ownProps) => {
  const { type, speciesName } = ownProps;
  const options = type === "gas" ? gas_options : type === "aerosol" ? aerosol_options : [];

  const mechanism = getMechanism(state);
  const speciesList = type === "gas" ? mechanism.gasSpecies : type === "aerosol" ? mechanism.aerosolSpecies : [];

  const species = speciesList?.find(spec => spec.name === speciesName );

  return {
    properties: species ? species.properties : [],
    options: options
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { type } = ownProps;

  let action = null;

  switch (type) {
    case 'aerosol':
      action = property => {
        dispatch(addAerosolProperty(property))
      }
      break;
    case 'gas':
      action = property => {
        dispatch(addProperty(property))
      }
      break;
    default:
      console.warn(`Unknown type: ${type}`)
  }

  return {
    addAction: action
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyList);