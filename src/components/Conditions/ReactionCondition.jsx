import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { addCondition } from "../../redux/actions";
import RemoveCondition from "./RemoveCondition";
import {
  getConditions,
  getUserDefinedRatesIds,
  getPossibleUnits,
} from "../../redux/selectors";

const ReactionCondition = (props) => {
  const condition = props.condition;
  const schema = props.schema;
  const name = condition.reactionId
    ? props.reactionNames.find(
        (reaction) => reaction.id === condition.reactionId,
      ).name
    : null;
  // console.log(condition)

  const handleUpdate = (newProps) => {
    props.addCondition({
      schema: schema,
      condition: {
        ...condition,
        ...newProps,
      },
    });
  };

  return (
    <>
      <div className="col-5" key={"label-" + condition.id}>
        <Dropdown>
          <Dropdown.Toggle variant="success" className="btn btn-light">
            {name || "<select>"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {schema.allowAddRemove
              ? props.possibleReactions.map((value, index) => {
                  return (
                    <Dropdown.Item
                      href="#"
                      key={index}
                      onClick={() => {
                        handleUpdate({
                          reactionId: value.id,
                          type: value.prefix,
                        });
                      }}
                    >
                      {value.name}
                    </Dropdown.Item>
                  );
                })
              : name}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="col-3" key={"value-" + condition.id}>
        <input
          type="text"
          className="form-control"
          defaultValue={condition.value}
          onBlur={(e) => {
            handleUpdate({ value: e.target.value });
          }}
        ></input>
      </div>
      <div className="col-3" key={"units-" + condition.id}>
        <Dropdown>
          <Dropdown.Toggle variant="success" className="btn btn-light">
            {condition.units || "<select>"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {props.possibleUnits && props.possibleUnits.length
              ? props.possibleUnits.map((value) => {
                  return (
                    <Dropdown.Item
                      href="#"
                      key={value}
                      onClick={(e) => {
                        handleUpdate({ units: e.target.innerHTML });
                      }}
                    >
                      {value}
                    </Dropdown.Item>
                  );
                })
              : null}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="col-1" key={"remove-" + condition.id}>
        {props.schema.allowAddRemove ? (
          <RemoveCondition schema={schema} conditionId={condition.id} />
        ) : null}
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const existingConditions = getConditions(state, ownProps.schema).map(
    (condition) => condition.reactionId,
  );
  const possibleReactions = getUserDefinedRatesIds(state).filter(
    (reaction) => !existingConditions.includes(reaction.id),
  );
  return {
    possibleReactions: possibleReactions,
    reactionNames: getUserDefinedRatesIds(state),
    possibleUnits: getPossibleUnits(state, ownProps.condition.reactionId),
  };
};

export default connect(mapStateToProps, { addCondition })(ReactionCondition);
