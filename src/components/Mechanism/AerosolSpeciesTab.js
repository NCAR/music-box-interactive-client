import React from "react";
import { connect } from "react-redux";

import SpeciesTab from "./SpeciesTab.js";
import { getMechanism } from "../../redux/selectors";

function AerosolSpeciesTab(props) {
  return (
    <SpeciesTab
      speciesType="aerosol"
      species={props.aerosolSpecies}
    />
  );
}

const mapStateToProps = (state) => {
  const mechanism = getMechanism(state);
  return mechanism;
};

export default connect(mapStateToProps)(AerosolSpeciesTab);
