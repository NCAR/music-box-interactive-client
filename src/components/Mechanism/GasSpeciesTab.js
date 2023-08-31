import React from "react";
import { connect } from "react-redux";

import SpeciesList from "./SpeciesList";
import AddSpecies from "./AddSpecies";
import Species from "./Species";
import SpeciesTab from "./SpeciesTab.js";
import SpeciesDetail from "./SpeciesDetail.js";
import PropertyList from "./PropertyList";
import { getMechanism } from "../../redux/selectors";
import { shared_properties } from "./shared_properties"

let options = [
  ...shared_properties
]

function GasSpeciesTab(props) {
  return (
    <SpeciesTab
      speciesType="gas"
      species={props.gasSpecies}
      SpeciesDetail={(specDetailProps) => <SpeciesDetail
        {...specDetailProps}
        propertyListComponent={(propListProps)  => <PropertyList
            {...propListProps}
            type="gas" 
            options={options}
          />
        }
      />
      }
    />
  );
}

const mapStateToProps = (state) => {
  const mechanism = getMechanism(state);
  return mechanism;
};

export default connect(mapStateToProps)(GasSpeciesTab);
