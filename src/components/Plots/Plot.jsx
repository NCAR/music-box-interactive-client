import React from "react";
import { connect } from "react-redux";
import { getPlotDataByType } from "../../redux/selectors";
import LinePlot from "./LinePlot";

const Plot = (props) => {
  console.log(props);
  return (
    <>
      {props.contents && (
        <LinePlot
          data={props.contents.data}
          label={props.contents.label}
          units={props.contents.units}
        />
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    contents: getPlotDataByType(state, ownProps.plot),
  };
};

export default connect(mapStateToProps)(Plot);
