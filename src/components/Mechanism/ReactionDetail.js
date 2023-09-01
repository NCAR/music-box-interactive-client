import React from "react";
import { connect } from "react-redux";
import ReactionProperty from "./ReactionProperty";
import { getReaction } from "../../redux/selectors";

const ReactionDetail = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    let newDetailReactions = { ...props.details };
    delete newDetailReactions[props.reactionId];
    props.setDetails(newDetailReactions);
  }

  return (
    <div className="card mb-4 reaction-card shadow-sm">
      <div className="card-header">
        <h4 className="my-0 fw-normal">{props.reaction.typeLabel}</h4>
      </div>
      <form className="body card-body">
        <div className="form-group properties">
          {props.reaction.elements.map((element, index) => {
            return <ReactionProperty key={`property-${index}`}
                                     schema={element}
                                     data={props.reaction.data}
                                     reactionId={props.reactionId}/>;
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

const mapStateToProps = (state, ownProps) => {
  const { reactionId } = ownProps;
  const reaction = getReaction(state, reactionId);
  return { reaction };
}

export default connect(mapStateToProps)(ReactionDetail);
