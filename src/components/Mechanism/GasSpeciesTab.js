import React from "react";
import { connect } from "react-redux";
import GasSpeciesDetail from "./GasSpeciesDetail.js";
import GasSpeciesList from "./GasSpeciesList.js";
import SpeciesTab from "./SpeciesTab.js";

function GasSpeciesTab() {
  return (
    <SpeciesTab
      speciesType="gas"
      SpeciesList={GasSpeciesList}
      SpeciesDetail={GasSpeciesDetail}
    />
  );
}

export default connect()(GasSpeciesTab);
