export const getNodes = (store) => store.flow.nodes;

export const getLinks = (store) => store.flow.links;

export const isSelectedSpecies = (store, speciesName) => store.flow.selected_species.includes(speciesName);

export const getIsFlowPlotLogScale = (store) => store.flow.is_log_scale;

export const getFlowMaxArrowWidth = (store) => store.flow.max_arrow_width;

export const getFlowTimeRangeStartIndex = (store) => store.flow.time_range_start_index;

export const getFlowTimeRangeEndIndex = (store) => store.flow.time_range_end_index;

export const getFlowLocalTimeRangeStart = (store) => store.flow.local_time_range_start;

export const getFlowLocalTimeRangeEnd = (store) => store.flow.local_time_range_end;