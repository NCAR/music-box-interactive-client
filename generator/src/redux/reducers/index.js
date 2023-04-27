import { combineReducers } from 'redux';
import { mechanismReducer } from "./mechanism";
import { conditionsReducer } from "./conditions";
import { resultsReducer } from "./results";
import { plotsReducer } from "./plots";

export default combineReducers({
    mechanism: mechanismReducer,
    conditions: conditionsReducer,
    results: resultsReducer,
    plots: plotsReducer
});
