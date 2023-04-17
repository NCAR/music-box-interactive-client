import React from "react";
import { connect } from "react-redux";

const GasSpecies = ({ species, detailSpecies, setDetailSpecies }) => {
  return (
    <li className="list-group-item list-group-item-action d-flex justify-content-between detailitem">
      <span>
        <a href="#" onClick={setDetailSpecies({ ...detailSpecies, "${species.name}": species })}>
          {species.name}
        </a>
      </span>
    </li>
  );
};

export default connect()(GasSpecies);
