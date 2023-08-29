import React from "react";
import { connect } from "react-redux";
import AddAerosolProperty from "./AddAerosolProperty";
import Property from "./Property";
import { getAerosolProperty } from "../../redux/selectors";

function AerosolPropertyList(props) {
  return (
    <div className="form-group properties">
      {props.properties && props.properties.length
        ? props.properties.map((property, index) => {
          return <Property key={`property-${property.name}`}
                           property={property}
                           speciesName={props.speciesName}/>;
        })
        : null }
      <AddAerosolProperty speciesName={props.speciesName} />
      <p>
      You may specify any property you like, but this is only <em>necessary</em> under certain circumstances (i.e., when the species participates in a reaction that requires the property be set). You will be prompted to set the property when it is required.
      </p>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { speciesName } = ownProps;
  const properties = getAerosolProperty(state, speciesName);
  return properties;
}

export default connect(mapStateToProps)(AerosolPropertyList);
