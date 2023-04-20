import React from "react";
import { connect } from "react-redux";
import MathJax from "react-mathjax";
import { updateReactionData } from "../redux/actions";
import ReactantList from "./ReactantList";
import ProductList from "./ProductList";

const ReactionProperty = (props) => {
  const handleUpdateReactionPropertyFloat = (e) => {
    props.updateReactionData({ id: props.reactionId,
                               data: {
                                 ...props.data,
                                 [props.schema.key]: parseFloat(e.target.value)
                               }
    });
  };

  const description = (
    <div dangerouslySetInnerHTML={{ __html: `<p><small>${props.schema.text}</small></p>` }} />
  );

  const equation = (
    <>
      <MathJax.Provider>
        <MathJax.Node formula={props.schema.value} />
      </MathJax.Provider>
      {props.schema.description && props.schema.description.length ?
          <div dangerouslySetInnerHTML={{ __html: `<p><small>${props.schema.description}</small></p>` }} />
        : null}
    </>
  );

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
      case "DESCRIPTION":
        return description;
      case "EQUATION":
        return equation;
      case "FLOAT":
        return floatInput;
      case "PRODUCT_LIST":
        return <ProductList reactionId={props.reactionId} />
      case "REACTANT_LIST":
        return <ReactantList reactionId={props.reactionId} />
      default:
        return (<div>{props.schema.type}</div>);
    };
  };

  return getProperty();
};

export default connect(null, { updateReactionData })(ReactionProperty);
