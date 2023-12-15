export const getNodes = (store) => store.flow.nodes;

export const getLinks = (store) => store.flow.links;

export const isSelectedSpecies = (store, speciesName) => store.flow.selected_species.includes(speciesName);

export const getIsFlowPlotLogScale = (store) => store.flow.is_log_scale;

export const getFlowMaxArrowWidth = (store) => store.flow.max_arrow_width;