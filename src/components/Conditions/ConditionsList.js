import React from "react";
import { connect } from "react-redux";
import AddCondition from "./AddCondition";
import { getConditions } from "../../redux/selectors";

const ConditionsList = props => {
  return (
    <div className="card mb-4 p-0 shadow-sm">
      <div className="card-header d-flex justify-content-between">
        <h4 className="my-0">
          {props.schema.label}
        </h4>
        {props.schema.allowAddRemove ?
          <AddCondition schema={props.schema} />
          : null }
      </div>
      <div className="bg-ncar-body p-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-5">
              {props.schema.nameLabel}
            </div>
            <div className="col-3">
              Initial value
            </div>
            <div className="col-3">
              Units
            </div>
          </div>
          {props.conditions && props.conditions.length ?
            props.conditions.map((condition, index) => {
              return (
                <div key={`condition-${index}`}
                     className="row my-1 row-data">
                  {props.schema.getComponent(condition.id, props.schema)}
                </div>
              );
            })
            : null }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { schema } = ownProps;
  const conditions = getConditions(state, schema);
  return { conditions };
};

export default connect(mapStateToProps)(ConditionsList);
