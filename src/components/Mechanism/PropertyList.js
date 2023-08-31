import React from "react";
import { connect } from "react-redux";
import Property from "./Property";
import AddProperty from "./AddProperty";
import { aerosol_options, gas_options } from "./shared_properties"

function PropertyList(props) {
  const options = props.type === "gas" ? gas_options : props.type === "aerosol" ? aerosol_options : [];

  return (
    <div className="form-group properties">
      {
        props?.properties?.map((property, index) => {
          return <Property key={index}
                           property={property}
                           speciesName={props.speciesName}/>;
        })
      }
      <AddProperty type={props.type} speciesName={props.speciesName} options={options}/>
      <p>
      You may specify any property you like, but this is only <em>necessary</em> under certain circumstances (i.e., when the species participates in a reaction that requires the property be set). You will be prompted to set the property when it is required.
      </p>
    </div>
  );
};


export default connect()(PropertyList);
