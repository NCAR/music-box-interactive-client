import { combineReducers } from 'redux';
import { mechanismReducer } from "./mechanism";
import { conditionsReducer } from "./conditions";

export default combineReducers({
    mechanism: mechanismReducer,
    conditions: conditionsReducer
});
