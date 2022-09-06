import utils from '../utils';

export const changeReactionType = (reactionType) => {
    return {
        type: utils.action_types.CHANGE_REACTION_TYPE,
        payload: reactionType
    }
}