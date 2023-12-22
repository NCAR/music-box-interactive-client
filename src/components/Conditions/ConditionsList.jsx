import React from "react";
import { connect } from "react-redux";
import AddCondition from "./AddCondition";
import { getConditions, getUserDefinedRatesIds } from "../../redux/selectors";

const ConditionsList = (props) => {
  return (
    <div className="card mb-4 p-0 shadow-sm">
      <div className="card-header d-flex justify-content-between">
        <h4 className="my-0">{props.schema.label}</h4>
        {props.schema.allowAddRemove && props.possibleReactions.length > 0 ? (
          <AddCondition schema={props.schema} />
        ) : null}
      </div>
      <div className="bg-ncar-body p-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-5">{props.schema.nameLabel}</div>
            <div className="col-3">Initial value</div>
            <div className="col-3">Units</div>
          </div>
          {props?.conditions?.map((condition) => {
            return (
              <div
                key={`condition-${condition.id}`}
                className="row my-1 row-data"
              >
                {props.schema.getComponent(condition, props.schema)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { schema } = ownProps;
  const conditions = getConditions(state, schema);
  const reactionIds = conditions.map((condition) => condition.reactionId);
  const possibleReactions = getUserDefinedRatesIds(state).filter(
    (reaction) => !reactionIds.includes(reaction.id),
  );
  return { conditions, possibleReactions };
};

export default connect(mapStateToProps)(ConditionsList);
