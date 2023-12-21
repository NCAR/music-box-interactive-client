import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { addCondition } from "../../redux/actions";
import RemoveCondition from "./RemoveCondition";
import {
  getCondition,
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
    console.log(condition)

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
    <div className="row my-1 row-data">
      <div className="col-5">
        <Dropdown>
          <Dropdown.Toggle variant="success" className="btn btn-light">
            {name || "<select>"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {schema.allowAddRemove
              ? props.reactionNames.map((value, index) => {
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
      <div className="col-3">
        <input
          type="text"
          className="form-control"
          defaultValue={condition.value}
          onBlur={(e) => {
            handleUpdate({ value: e.target.value });
          }}
        ></input>
      </div>
      <div className="col-3">
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
      <div className="col-1">
        {props.schema.allowAddRemove ? (
          <RemoveCondition schema={schema} conditionId={condition.id} />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const condition = getCondition(state, ownProps.schema, ownProps.conditionId);
  return {
    condition: condition,
    reactionNames: getUserDefinedRatesIds(state),
    possibleUnits: getPossibleUnits(state, condition.reactionId),
  };
};

export default connect(mapStateToProps, { addCondition })(ReactionCondition);
