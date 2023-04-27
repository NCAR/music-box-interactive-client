import { combineReducers } from 'redux';
import { mechanismReducer } from "./mechanism";
import { conditionsReducer } from "./conditions";
import { resultsReducer } from "./results";

export default combineReducers({
    mechanism: mechanismReducer,
    conditions: conditionsReducer,
    results: resultsReducer
});
