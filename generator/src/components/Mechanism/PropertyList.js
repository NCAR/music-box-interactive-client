import React from "react";
import { connect } from "react-redux";
import AddProperty from "./AddProperty";
import Property from "./Property";
import { getProperty } from "../../redux/selectors";

function PropertyList(props) {
  return (
    <div className="form-group properties">
      {props.properties && props.properties.length
        ? props.properties.map((property, index) => {
          return <Property key={`property-${property.name}`}
                           property={property}
                           speciesName={props.speciesName}/>;
        })
        : null }
      <AddProperty speciesName={props.speciesName} />
      <p>
      You may specify any property you like, but this is only <em>necessary</em> under certain circumstances (i.e., when the species participates in a reaction that requires the property be set). You will be prompted to set the property when it is required.
      </p>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { speciesName } = ownProps;
  const properties = getProperty(state, speciesName);
  return properties;
}

export default connect(mapStateToProps)(PropertyList);
