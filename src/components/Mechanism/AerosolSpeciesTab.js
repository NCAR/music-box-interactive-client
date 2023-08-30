import React from "react";
import { connect } from "react-redux";
import AerosolSpeciesList from "./AerosolSpeciesList.js";
import SpeciesTab from "./SpeciesTab.js";
import AerosolPropertyList from "./AerosolPropertyList";
import SpeciesDetail from "./SpeciesDetail.js";

function AerosolSpeciesTab() {
  return (
    <SpeciesTab
      speciesType="aerosol"
      SpeciesList={AerosolSpeciesList}
      SpeciesDetail={(props) => <SpeciesDetail {...props} propertyListComponent={AerosolPropertyList}/>}
    />
  );
}

export default connect()(AerosolSpeciesTab);
