import { combineReducers } from 'redux';
import utils from '../utils';

const reactionTypeReducer = (reactionType = utils.reaction_types.GAS, action) => {
    if (action.type === utils.action_types.CHANGE_REACTION_TYPE) {
        console.log(action.payload)
        return action.payload;
    }

    return reactionType;
}

export default combineReducers({
    reactionType: reactionTypeReducer
})