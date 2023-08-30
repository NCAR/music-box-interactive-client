import React from "react";
import { connect } from "react-redux";
import { getMechanism } from "../../redux/selectors";
import SpeciesList from "./SpeciesList";
import AddSpecies from "./AddSpecies";
import Species from "./Species";

function AerosolSpeciesList(props) {
  return (
    <SpeciesList 
      {...props}
      species={props.aerosolSpecies} 
      addSpeciesComponent={() => <AddSpecies type="aerosol"/>} 
      speciesComponent={(props) => <Species {...props} type="aerosol"/>} 
    />
  )
}

const mapStateToProps = (state) => {
  const mechanism = getMechanism(state);
  return mechanism;
};

export default connect(mapStateToProps)(AerosolSpeciesList);
