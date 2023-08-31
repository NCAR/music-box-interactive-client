import React from "react";
import { connect } from "react-redux";

import SpeciesList from "./SpeciesList";
import AddSpecies from "./AddSpecies";
import Species from "./Species";
import SpeciesTab from "./SpeciesTab.js";
import GasPropertyList from "./GasPropertyList.js";
import SpeciesDetail from "./SpeciesDetail.js";
import { getMechanism } from "../../redux/selectors";

function GasSpeciesTab(props) {
  return (
    <SpeciesTab
      speciesType="gas"
      SpeciesList={
        (specListProps) => <SpeciesList 
          {...specListProps}
          species={props.gasSpecies} 
          addSpeciesComponent={() => <AddSpecies type="gas"/>} 
          speciesComponent={(specCompProps) => <Species {...specCompProps} type="gas"/>} 
        />
      }
      SpeciesDetail={(specDetailProps) => <SpeciesDetail {...specDetailProps} propertyListComponent={GasPropertyList}/>}
    />
  );
}

const mapStateToProps = (state) => {
  const mechanism = getMechanism(state);
  return mechanism;
};

export default connect(mapStateToProps)(GasSpeciesTab);
