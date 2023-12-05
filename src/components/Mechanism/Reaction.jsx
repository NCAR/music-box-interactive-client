import React from "react";
import { connect } from "react-redux";
import { removeReaction } from "../../redux/actions";

const Reaction = ({ item: reaction, details, setDetails, removeReaction  }) => {
  const handleDetailClick = (e) => {
    e.preventDefault();
    setDetails({ ...details, [reaction.id]: reaction });
  }

  const handleDeleteClick = (e) => {
    e.preventDefault();
    const { [reaction.id]: _, ...details } = details;
    setDetails({ ...details });
    removeReaction(reaction.id);
  }

  return (
    <li className="list-group-item list-group-item-action d-flex justify-content-between">
      <button type="button"
              className="btn-clear"
              onClick={handleDetailClick}
              onKeyDown={handleDetailClick}>
        <span className="reaction-detail-link">
          {reaction.shortName()}
        </span>
      </button>
      <button type="button"
              className="btn-clear"
              onClick={handleDeleteClick}
              onKeyDown={handleDeleteClick}>
        <span className="navlink reaction-remove m-0 p-0">
          <span className="oi oi-x"
                toggle="tooltip"
                aria-hidden="true"
                title={`remove ${reaction.shortName()}`}>
          </span>
        </span>
      </button>
    </li>
  );
};

export default connect(null, { removeReaction })(Reaction);
