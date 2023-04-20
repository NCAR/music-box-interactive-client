import React from "react";
import { connect } from "react-redux";
import ReactionProperty from "./ReactionProperty";

const ReactionDetail = ({ reaction, detailReactions, setDetailReactions }) => {
  const handleClick = (e) => {
    e.preventDefault();
    let newDetailReactions = { ...detailReactions };
    delete newDetailReactions[reaction.id];
    setDetailReactions(newDetailReactions);
  }

  return (
    <div className="card mb-4 reaction-card shadow-sm">
      <div className="card-header">
        <h4 className="my-0 fw-normal">{reaction.typeLabel}</h4>
      </div>
      <form className="body card-body">
        <div className="form-group properties">
          {Object.entries(reaction.data).map(([key, value]) => {
            return <ReactionProperty key={key}
                                     label={key}
                                     value={value}
                                     reactionId={reaction.id}/>;
          })}
        </div>
        <div className="container text-center mt-3">
          <button type="button"
                  className="btn btn-secondary btn-cancel"
                  onClick={handleClick}>Close</button>
        </div>
      </form>
    </div>
  );
}

export default connect()(ReactionDetail);
