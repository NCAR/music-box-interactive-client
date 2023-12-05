import React from "react";
import { connect } from "react-redux";

const Plot = props => {

  return(
    <div>
      {props.plot.srcValue ?
        <img alt={props.plot.label} src={props.plot.srcValue} />
       :<>Plot for {props.plot.label}</>}
    </div>
  )
}

export default connect()(Plot)
