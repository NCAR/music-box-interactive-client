import React from "react";
import { connect } from "react-redux";
import { removeReaction } from "../redux/actions";

const Reaction = (props) => {
  const handleDetailClick = (e) => {
    e.preventDefault();
    props.setDetailReactions({ ...props.detailReactions, [props.reaction.id]: props.reaction });
  }

  const handleDeleteClick = (e) => {
    e.preventDefault();
    const { [props.reaction.id]: _, ...detailReactions } = props.detailReactions;
    props.setDetailReactions({ ...detailReactions });
    props.removeReaction(props.reaction.id);
  }

  return (
    <li className="list-group-item list-group-item-action d-flex justify-content-between">
      <button type="button"
              className="btn-clear"
              onClick={handleDetailClick}
              onKeyDown={handleDetailClick}>
        <span className="reaction-detail-link">
          {props.reaction.shortName()}
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
                title={`remove ${props.reaction.shortName()}`}>
          </span>
        </span>
      </button>
    </li>
  );
};

export default connect(null, { removeReaction })(Reaction);
