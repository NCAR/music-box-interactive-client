import React from "react";
import { connect } from "react-redux";
import AddAerosolSpecies from "./AddAerosolSpecies";
import AerosolSpecies from "./AerosolSpecies";
import { getMechanism } from "../../redux/selectors";

function AerosolSpeciesList(props) {
  console.log(props)
  return (
    <nav className="bg-ncar-menu-secondary p-2">
      <AddAerosolSpecies />
      <ul className="list-group species-list">
        {props.aerosolSpecies && props.aerosolSpecies.length
          ? props.aerosolSpecies.map((species, index) => {
          return <AerosolSpecies key={`species-${species.name}`}
                             species={species}
                             detailSpecies={props.detailSpecies}
                             setDetailSpecies={props.setDetailSpecies} />;
          })
          : null }
      </ul>
    </nav>
  );

}

const mapStateToProps = state => {
    const mechanism = getMechanism(state);
    return mechanism;
};

export default connect(mapStateToProps)(AerosolSpeciesList);
