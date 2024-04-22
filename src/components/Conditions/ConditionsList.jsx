import React from "react";
import { connect } from "react-redux";
import AddCondition from "./AddCondition";
import { getConditions, getUserDefinedRatesIds } from "../../redux/selectors";
import { getMechanism } from "../../redux/selectors";

const ConditionsList = (props) => {
  return (
    <div className="card mb-4 p-0 shadow-sm">
      <div className="card-header d-flex justify-content-between">
        <h4 className="my-0">{props.schema.label}</h4>
        {props.schema.allowAddRemove && props.remaining_unused > 0 ? (
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

  // keep track of how many conditions can still be added
  let remaining_unused = 0;

  if (schema.classKey === "initial_species_concentrations") {
    const mechanism = getMechanism(state);
    // -1 below because M is always a species in the gas phase
    // but you cannot set its concentration
    remaining_unused = mechanism.gasSpecies.length - 1 - conditions.length;
    conditions.sort((a, b) => a.name.localeCompare(b.name));
  } else if (schema.classKey === "initial_environmental_conditions") {
    conditions.sort((a, b) => a.name.localeCompare(b.name));
  } else if (schema.classKey === "initial_reactions") {
    const reactionIds = conditions.map((condition) => condition.reactionId);
    const possibleReactions = getUserDefinedRatesIds(state);

    // join the possible reactions with the conditions so that the name value of possible reactions is also on conditions
    conditions = conditions.map((condition) => {
      const reaction = possibleReactions.find(
        (reaction) => reaction.id === condition.reactionId
      );
      return { ...condition, name: reaction?.name || "" };
    });
    conditions.sort((a, b) => a.name.localeCompare(b.name));
    remaining_unused = possibleReactions.length - reactionIds.length;
  }
  return { conditions, remaining_unused };
};

export default connect(mapStateToProps)(ConditionsList);
