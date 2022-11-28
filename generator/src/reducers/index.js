import { combineReducers } from 'redux';
import utils from '../utils';

const reactionTypeReducer = (reactionType = utils.reaction_types.GAS, action) => {
    if (action.type === utils.action_types.CHANGE_REACTION_TYPE) {
        console.log(action.payload)
        return action.payload;
    }
    return reactionType;
}

const speciesConfigReducer = (speciesConfigs, action) => {
    if (action.type === utils.action_types.ADD_NEW_SPECIES) {
        speciesConfigs = [...speciesConfigs, action.payload]
    } else if (action.type === utils.action_types.CHANGE_EXISTING_SPECIES) {
        // TODO
    }

    return speciesConfigs
}


export default combineReducers({
    reactionType: reactionTypeReducer
})