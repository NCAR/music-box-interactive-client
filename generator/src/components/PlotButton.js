import React from "react";
import { connect } from "react-redux";
import { addPlot, removePlot } from "../redux/actions";
import { getPlotsByType } from "../redux/selectors";
import { getPlot } from "../controllers/api";

const PlotButton = props => {

  const handlePlot = () => {
    if (props.active) {
      removePlot({ type: props.type, id: props.plot.id })
    } else {
      const doGetPlot = async () => {
        try {
          const response = await getPlot(props.plot);
          console.log(`plot request response: ${response.data}`);
          addPlot({ type: props.type, plot: props.plot });
        } catch (error) {
          console.error(`Error retrieving plot: ${error}`);
        }
      };
      doGetPlot();
    }
  }

  return (
    <button className={`sub_p list-group-item list-group-item-action ${props.active ? "active" : null}`}
            subtype="normal"
            onClick={handlePlot}>
      {props.plot.label}
    </button>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    active: getPlotsByType(state, ownProps.type).map(plot => plot.id).includes(ownProps.plot.id)
  }
}

export default connect(mapStateToProps)(PlotButton)
