import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { addCondition } from "../../redux/actions";

const EnvironmentalCondition = (props) => {
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
        <input
          type="text"
          className="form-control"
          value={condition.name}
          disabled
        ></input>
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
            {schema.units[condition.name].map((value) => {
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
    </div>
  );
};

export default connect(null, { addCondition })(EnvironmentalCondition);
