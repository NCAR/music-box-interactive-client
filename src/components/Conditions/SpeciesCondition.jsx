import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { addCondition } from "../../redux/actions";
import RemoveCondition from "./RemoveCondition";
import { getCondition, getVariableSpeciesNames } from "../../redux/selectors";

const SpeciesCondition = (props) => {
  const condition = props.condition;
  const schema = props.schema;

  const handleUpdate = (key, value) => {
    props.addCondition({
      schema: schema,
      condition: {
        ...condition,
        [key]: value,
      },
    });
  };

  return (
    <div className="row my-1 row-data">
      <div className="col-5">
        <Dropdown>
          <Dropdown.Toggle variant="success" className="btn btn-light">
            {condition.name || "<select>"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {schema.allowAddRemove
              ? props.speciesNames.map((value) => {
                  return (
                    <Dropdown.Item
                      href="#"
                      key={value}
                      onClick={(e) => {
                        handleUpdate("name", e.target.innerHTML);
                      }}
                    >
                      {value}
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
            handleUpdate("value", e.target.value);
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
            {schema.units.map((value) => {
              return (
                <Dropdown.Item
                  href="#"
                  key={value}
                  onClick={(e) => {
                    handleUpdate("units", e.target.innerHTML);
                  }}
                >
                  {value}
                </Dropdown.Item>
              );
            })}
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
  return {
    speciesNames: getVariableSpeciesNames(state),
  };
};

export default connect(mapStateToProps, { addCondition })(SpeciesCondition);
