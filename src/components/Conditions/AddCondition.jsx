import React from "react";
import { connect } from "react-redux";
import { addCondition } from "../../redux/actions";

const AddCondition = (props) => {
  const handleAddCondition = () => {
    props.addCondition({ schema: props.schema });
  };

  return (
    <button
      type="button"
      className="btn btn-primary add-element"
      onClick={handleAddCondition}
      onKeyDown={handleAddCondition}
    >
      <span
        className="oi oi-plus"
        toggle="tooltop"
        aria-hidden="true"
        title="Add condition"
      ></span>
    </button>
  );
};

export default connect(null, { addCondition })(AddCondition);
