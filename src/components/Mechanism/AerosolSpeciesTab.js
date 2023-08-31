import React from "react";
import { connect } from "react-redux";

import SpeciesList from "./SpeciesList";
import AddSpecies from "./AddSpecies";
import Species from "./Species";
import SpeciesTab from "./SpeciesTab.js";
import SpeciesDetail from "./SpeciesDetail.js";
import { getMechanism } from "../../redux/selectors";
import { shared_properties } from "./shared_properties"
import PropertyList from "./PropertyList";

let options = [
  ...shared_properties,
  {
      displayName: "density",
      name: "density",
      "data-type": "number",
      value: 0
  },
  {
      displayName: "kappa",
      name: "kappa",
      "data-type": "number",
      value: 0
  }
]

function AerosolSpeciesTab(props) {
  return (
    <SpeciesTab
      speciesType="aerosol"
      species={props.aerosolSpecies}
      SpeciesDetail={(specDetailProps) => <SpeciesDetail
        {...specDetailProps}
        propertyListComponent={(propListProps)  => <PropertyList
            {...propListProps}
            type="aerosol" 
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

export default connect(mapStateToProps)(AerosolSpeciesTab);
