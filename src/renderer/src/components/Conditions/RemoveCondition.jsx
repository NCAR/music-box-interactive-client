import React from "react";
import { connect } from "react-redux";
import { removeCondition } from "../../redux/actions";

const RemoveCondition = (props) => {
  const handleRemoveCondition = () => {
    props.removeCondition({
      schema: props.schema,
      conditionId: props.conditionId,
    });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary remove-elememt"
        onClick={handleRemoveCondition}
        onKeyDown={handleRemoveCondition}
      >
        <span
          className="oi oi-x"
          toggle="tooltip"
          aria-hidden="true"
          title="Remove condition"
        ></span>
      </button>
    </div>
  );
};

export default connect(null, { removeCondition })(RemoveCondition);
