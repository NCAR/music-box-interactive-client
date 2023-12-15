import utils from "../utils";

export const selectFlowSpecies = (content) => {
  return {
    type: utils.action_types.SELECT_FLOW_SPECIES,
    payload: { content },
  };
};

export const deselectFlowSpecies = (content) => {
  return {
    type: utils.action_types.DESELECT_FLOW_SPECIES,
    payload: { content },
  };
};

export const setIsFlowPlotLogScale = (content) => {
  return {
    type: utils.action_types.SET_IS_FLOW_PLOT_LOG_SCALE,
    payload: { content },
  };
};

export const setFlowMaxArrowWidth = (content) => {
  return {
    type: utils.action_types.SET_FLOW_MAX_ARROW_WIDTH,
    payload: { content },
  };
};