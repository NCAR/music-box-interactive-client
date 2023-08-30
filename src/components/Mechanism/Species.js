import React from "react";
import { connect } from "react-redux";
import { removeGasSpecies } from "../../redux/actions";
import { removeAerosolSpecies } from "../../redux/actions";

const Species = (props) => {
  const handleDetailClick = (e) => {
    e.preventDefault();
    props.setDetailSpecies({ ...props.detailSpecies, [props.species.name]: props.species });
  }

  const handleDeleteClick = (e) => {
    e.preventDefault();
    const { [props.species.name]: _, ...detailSpecies } = props.detailSpecies;
    props.setDetailSpecies({ ...detailSpecies });
    props.removeAction(props.species.name);
  }


  return (
    <li className="list-group-item list-group-item-action d-flex justify-content-between detailitem">
      <button type='button'
              className="btn-clear"
              onClick={handleDetailClick}
              onKeyDown={handleDetailClick}>
        <span className="species-detail-link-item">
          {props.species.name}
        </span>
      </button>
      <button type='button'
              className="btn-clear"
              onClick={handleDeleteClick}
              onKeyDown={handleDeleteClick}>
        <span className="navlink species-remove m-0 p-0">
          <span className="oi oi-x"
                toggle="tooltip"
                aria-hidden="true"
                title={`remove ${props.species.name}`}
                >
          </span>
        </span>
      </button>
    </li>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { type } = ownProps;

    let action = null;

    switch (type)
    {
        case 'aerosol':
            action = species => dispatch(removeAerosolSpecies(species))
            break;
        case 'gas':
            action = species => dispatch(removeGasSpecies(species))
            break;
    }
    
    return {
        removeAction: action
    };
};

export default connect(null, mapDispatchToProps)(Species);
