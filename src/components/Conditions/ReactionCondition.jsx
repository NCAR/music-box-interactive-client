import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { addCondition } from "../../redux/actions";
import RemoveCondition from "./RemoveCondition";
import {
  getConditions,
  getUserDefinedRates,
  getPossibleUnits,
} from "../../redux/selectors";

const ReactionCondition = (props) => {
  const condition = props.condition;
  const schema = props.schema;

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
            {condition.name && condition.name.length
              ? condition.name
              : "<select>"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {schema.allowAddRemove
              ? props.reactionNames.map((value) => {
                  return (
                    <Dropdown.Item
                      href="#"
                      key={value.name}
                      onClick={() => {
                        handleUpdate({ name: value.name, type: value.prefix });
                      }}
                    >
                      {value.name}
                    </Dropdown.Item>
                  );
                })
              : condition.name}
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
            {condition.units && condition.units.length
              ? condition.units
              : "<select>"}
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
  const condition = getConditions(state, ownProps.schema).filter((condition) => {
    return condition.id === ownProps.conditionId;
  })[0];
  return {
    condition: condition,
    reactionNames: getUserDefinedRates(state),
    possibleUnits: getPossibleUnits(state, condition?.name),
  };
};

export default connect(mapStateToProps, { addCondition })(ReactionCondition);
