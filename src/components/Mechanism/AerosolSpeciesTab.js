import React from "react";
import { connect } from "react-redux";

import AerosolPropertyList from "./AerosolPropertyList";

import SpeciesList from "./SpeciesList";
import AddSpecies from "./AddSpecies";
import Species from "./Species";
import SpeciesTab from "./SpeciesTab.js";
import SpeciesDetail from "./SpeciesDetail.js";
import { getMechanism } from "../../redux/selectors";

function AerosolSpeciesTab(props) {
  return (
    <SpeciesTab
      speciesType="aerosol"
      SpeciesList={
        (otherProps) =>     <SpeciesList 
          {...otherProps}
          species={props.aerosolSpecies} 
          addSpeciesComponent={() => <AddSpecies type="aerosol"/>} 
          speciesComponent={(otherProps) => <Species {...otherProps} type="aerosol"/>} 
        />
      }
      SpeciesDetail={(otherProps) => <SpeciesDetail {...otherProps} propertyListComponent={AerosolPropertyList}/>}
    />
  );
}

const mapStateToProps = (state) => {
  const mechanism = getMechanism(state);
  return mechanism;
};

export default connect(mapStateToProps)(AerosolSpeciesTab);
