import React from "react";
import { connect } from "react-redux";

const ReactionProperty = (props) => {
  const handleUpdateReactionProperty = (e) => {
    console.log("updating reaction property", props.key, e.target.value);
  };

  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">{props.label}</span>
      </div>
      <input type="text"
             className="form-control"
             placeholder="Property value"
             value={props.value}
             onChange={handleUpdateReactionProperty}>
      </input>
    </div>
  );
};

export default connect()(ReactionProperty);
