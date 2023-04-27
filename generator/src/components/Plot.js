import React from "react";
import { connect } from "react-redux";

const Plot = props => {

  return(
    <div>
      Plot for {props.plot.label}
    </div>
  )
}

export default connect()(Plot)
