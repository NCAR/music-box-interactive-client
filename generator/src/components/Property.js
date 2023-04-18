import React from "react";
import { connect } from "react-redux";

const Property = (props) => {
  return (
    <div className="input-group mb-3" property={props.name} data-type={props.data_type}>
      <div className="input-group-prepend">
        <span className="input-group-text">{props.name}</span>
      </div>
      <input type="text"
             className="form-control"
             placeholder="Property value"
             disabled
             value={props.value}>
      </input>
    </div>
  );
};

export default connect()(Property);
