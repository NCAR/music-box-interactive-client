import React from "react";
import { connect } from "react-redux";
import AerosolSpeciesDetail from "./AerosolSpeciesDetail.js";
import AerosolSpeciesList from "./AerosolSpeciesList.js";
import SpeciesTab from "./SpeciesTab.js";

function AerosolSpeciesTab() {
  return (
    <SpeciesTab
      speciesType="aerosol"
      SpeciesList={AerosolSpeciesList}
      SpeciesDetail={AerosolSpeciesDetail}
    />
  );
}

export default connect()(AerosolSpeciesTab);
