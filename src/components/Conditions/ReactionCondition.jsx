import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { addCondition } from "../../redux/actions";
import RemoveCondition from "./RemoveCondition";
import {
  getConditions,
  getPossibleInitialReactionConditions,
  getReactionName
} from "../../redux/selectors";

const ReactionCondition = ({ condition, schema, ...props }) => {
  const name = condition?.name || null;
  console.log(props.possibleConditions)
  const matchingCondition = props.possibleConditions.find((elem) => elem.reactionId === condition.reactionId && elem.suffix === condition.suffix);
  const possibleUnits = matchingCondition?.possibleUnits || null;

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
              ? props?.unsetInitialConditions.map((value, index) => {
                return (
                  <Dropdown.Item
                    href="#"
                    key={index}
                    onClick={() => {
                      console.log(value.reactionId)
                      handleUpdate({
                        reactionId: value.reactionId,
                        suffix: value.suffix,
                        name: value.name
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
        {possibleUnits &&
          <Dropdown>
            <Dropdown.Toggle variant="success" className="btn btn-light">
              {condition.units || "<select>"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {possibleUnits?.map((value) => {
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
              })}
            </Dropdown.Menu>
          </Dropdown>
        }
      </div>
      <div className="col-1" key={"remove-" + condition.id}>
        {schema.allowAddRemove ? (
          <RemoveCondition schema={schema} conditionId={condition.id} />
        ) : null}
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const possibleConditions = getPossibleInitialReactionConditions(state).map((value) => {
    return { name: `${getReactionName(state, value.reactionId)}${value.suffix}`, ...value };
  });
  const existingConditions = getConditions(state, ownProps.schema);

  const unsetInitialConditions = possibleConditions.filter((condition) => {
    return !existingConditions.find(
      (existingCondition) => existingCondition.name === condition.name && existingCondition.suffix === condition.suffix
    );
  }).map((value) => {
    return { name: `${getReactionName(state, value.reactionId)}${value.suffix}`, ...value };
  });

  return {
    unsetInitialConditions: unsetInitialConditions,
    possibleConditions: possibleConditions,
  };
};

export default connect(mapStateToProps, { addCondition })(ReactionCondition);
