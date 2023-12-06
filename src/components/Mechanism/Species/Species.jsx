import React from "react";
import { connect } from "react-redux";
import { removeGasSpecies } from "../../../redux/actions";
import { removeAerosolSpecies } from "../../../redux/actions";

const Species = ({ details, item: species, setDetails, removeAction }) => {
  const handleDetailClick = (e) => {
    e.preventDefault();
    setDetails({ ...details, [species.name]: species });
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    const { [species.name]: _, ...details } = species.details;
    setDetails({ ...details });
    removeAction(species.name);
  };

  return (
    <li className="list-group-item list-group-item-action d-flex justify-content-between detailitem">
      <button
        type="button"
        className="btn-clear"
        onClick={handleDetailClick}
        onKeyDown={handleDetailClick}
      >
        <span className="species-detail-link-item">{species.name}</span>
      </button>
      <button
        type="button"
        className="btn-clear"
        onClick={handleDeleteClick}
        onKeyDown={handleDeleteClick}
      >
        <span className="navlink species-remove m-0 p-0">
          <span
            className="oi oi-x"
            toggle="tooltip"
            aria-hidden="true"
            title={`remove ${species.name}`}
          ></span>
        </span>
      </button>
    </li>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { type } = ownProps;

  let action = null;

  switch (type) {
    case "aerosol":
      action = (species) => dispatch(removeAerosolSpecies(species));
      break;
    case "gas":
      action = (species) => dispatch(removeGasSpecies(species));
      break;
  }

  return {
    removeAction: action,
  };
};

export default connect(null, mapDispatchToProps)(Species);
