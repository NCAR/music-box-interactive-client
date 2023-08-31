import React from "react";
import { connect } from "react-redux";

import SpeciesTab from "./SpeciesTab.js";
import { getMechanism } from "../../redux/selectors";

function GasSpeciesTab(props) {
  return (
    <SpeciesTab
      speciesType="gas"
      species={props.gasSpecies}
    />
  );
}

const mapStateToProps = (state) => {
  const mechanism = getMechanism(state);
  return mechanism;
};

export default connect(mapStateToProps)(GasSpeciesTab);
