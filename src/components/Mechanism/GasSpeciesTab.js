import React from "react";
import { connect } from "react-redux";
import GasSpeciesList from "./GasSpeciesList.js";
import SpeciesTab from "./SpeciesTab.js";
import GasPropertyList from "./GasPropertyList.js";
import SpeciesDetail from "./SpeciesDetail.js";

function GasSpeciesTab() {
  return (
    <SpeciesTab
      speciesType="gas"
      SpeciesList={GasSpeciesList}
      SpeciesDetail={(props) => <SpeciesDetail {...props} propertyListComponent={GasPropertyList}/>}
    />
  );
}

export default connect()(GasSpeciesTab);
