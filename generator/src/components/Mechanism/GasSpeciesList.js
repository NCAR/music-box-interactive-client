import React from "react";
import { connect } from "react-redux";
import AddGasSpecies from "./AddGasSpecies";
import GasSpecies from "./GasSpecies";
import { getMechanism } from "../../redux/selectors";

function GasSpeciesList(props) {

  return (
    <nav className="bg-ncar-menu-secondary p-2">
      <AddGasSpecies />
      <ul className="list-group species-list">
        {props.gasSpecies && props.gasSpecies.length
          ? props.gasSpecies.map((species, index) => {
          return <GasSpecies key={`species-${species.name}`}
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

export default connect(mapStateToProps)(GasSpeciesList);
