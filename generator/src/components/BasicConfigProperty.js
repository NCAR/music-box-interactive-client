import React from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { updateBasicConfiguration } from "../redux/actions";

const BasicConfigProperty = (props) => {
  const handleUpdateFloat = (e) => {
    props.updateBasicConfiguration({
      data: {
        ...props.data,
        [props.schema.key]: parseFloat(e.target.value)
      }
    });
  };

  const handleUpdateListString = (stringValue) => {
    props.updateBasicConfiguration({
      data: {
        ...props.data,
        [props.schema.key]: stringValue
      }
    });
  };

  console.log("BasicConfigProperty", props);

  const floatInput = (
    <div>
      <label> {props.schema.label} </label>
      <input type="text"
             className="form-control"
             defaultValue={props.data[props.schema.key]}
             onBlur={handleUpdateFloat}>
      </input>
      {props.schema.units && props.schema.units.length ?
        <div className="input-group-append">
          <Dropdown>
            <Dropdown.Toggle variant="success" className="btn btn-light">
              {props.data[props.schema.units.key]}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {props.schema.units.values.map(units => {
                return (
                  <Dropdown.Item href="#" key={units} onClick={() => {handleUpdateListString(units)}}>
                    {units}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        : null}
    </div>
  );

  const getProperty = () => {
    switch(props.schema.type) {
      case "FLOAT":
        return floatInput;
      default:
        return (<div>{props.schema.type}</div>);
    };
  };

  return getProperty();
};

export default connect(null, { updateBasicConfiguration })(BasicConfigProperty);
