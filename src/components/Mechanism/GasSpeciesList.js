import React from "react";
import { connect } from "react-redux";
import AddGasSpecies from "./AddGasSpecies";
import GasSpecies from "./GasSpecies";
import SpeciesList from "./SpeciesList";
import { getMechanism } from "../../redux/selectors";

function GasSpeciesList(props) {
  return (
    <SpeciesList 
      {...props}
      species={props.gasSpecies} 
      addSpeciesComponent={AddGasSpecies} 
      speciesComponent={GasSpecies} 
    />
  )
}

const mapStateToProps = (state) => {
  const mechanism = getMechanism(state);
  return mechanism;
};

export default connect(mapStateToProps)(GasSpeciesList);
