import React from "react";
import { connect } from "react-redux";
import { updateReactionData } from "../redux/actions";

const ReactionProperty = (props) => {
  const handleUpdateReactionPropertyFloat = (e) => {
    props.updateReactionData({ id: props.reactionId,
                               data: {
                                 ...props.data,
                                 [props.schema.key]: parseFloat(e.target.value)
                               }
    });
  };

  const floatInput = (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">{props.schema.label}</span>
      </div>
      <input type="text"
             className="form-control"
             placeholder="Property value"
             defaultValue={props.data[props.schema.key]}
             onBlur={handleUpdateReactionPropertyFloat}>
      </input>
      {props.schema.units && props.schema.units.length ?
        <div className="input-group-append">
          <span className="input-group-text">
            <div dangerouslySetInnerHTML={{ __html: props.schema.units }} />
          </span>
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

export default connect(null, { updateReactionData })(ReactionProperty);
