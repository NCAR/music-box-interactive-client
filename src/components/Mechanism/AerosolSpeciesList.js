import React from "react";
import { connect } from "react-redux";
import AddAerosolSpecies from "./AddAerosolSpecies";
import AerosolSpecies from "./AerosolSpecies";
import { getMechanism } from "../../redux/selectors";
import SpeciesList from "./SpeciesList";

function AerosolSpeciesList(props) {
  return (
    <SpeciesList 
      {...props}
      species={props.aerosolSpecies} 
      addSpeciesComponent={AddAerosolSpecies} 
      speciesComponent={AerosolSpecies} 
    />
  )
}

const mapStateToProps = (state) => {
  const mechanism = getMechanism(state);
  return mechanism;
};

export default connect(mapStateToProps)(AerosolSpeciesList);
