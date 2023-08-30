import React from "react";
import { connect } from "react-redux";
import SpeciesList from "./SpeciesList";
import { getMechanism } from "../../redux/selectors";
import AddSpecies from "./AddSpecies";
import Species from "./Species";

function GasSpeciesList(props) {
  return (
    <SpeciesList 
      {...props}
      species={props.gasSpecies} 
      addSpeciesComponent={() => <AddSpecies type="gas"/>} 
      speciesComponent={(props) => <Species {...props} type="gas"/>} 
    />
  )
}

const mapStateToProps = (state) => {
  const mechanism = getMechanism(state);
  return mechanism;
};

export default connect(mapStateToProps)(GasSpeciesList);
