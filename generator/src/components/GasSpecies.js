import React from "react";
import { connect } from "react-redux";
import { removeGasSpecies } from "../redux/actions";

const GasSpecies = (props) => {
  const handleDetailClick = (e) => {
    e.preventDefault();
    props.setDetailSpecies({ ...props.detailSpecies, [props.species.name]: props.species });
  }

  const handleDeleteClick = (e) => {
    e.preventDefault();
    props.removeGasSpecies(props.species.name);
  }


  return (
    <li className="list-group-item list-group-item-action d-flex justify-content-between detailitem">
      <span className="species-detail-link-item" onClick={handleDetailClick} onKeyDown={handleDeleteClick}>
        {props.species.name}
      </span>
      <span className="navlink species-remove m-0 p-0">
        <span className="oi oi-x"
              toggle="tooltip"
              aria-hidden="true"
              title={`remove ${props.species.name}`}
              onClick={handleDeleteClick}
              onKeyDown={handleDeleteClick}
              >
        </span>
      </span>
    </li>
  );
};

export default connect(null, { removeGasSpecies })(GasSpecies);
