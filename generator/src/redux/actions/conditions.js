import utils from '../utils';

export const updateBasicConfiguration = (content) => {
    return {
        type: utils.action_types.UPDATE_BASIC_CONFIGURATION,
        payload: { content }
    }
}

export const addCondition = (content) => {
    return {
        type: utils.action_types.ADD_CONDITION,
        payload: { content }
    }
}

export const removeCondition = (content) => {
    return {
        type: utils.action_types.REMOVE_CONDITION,
        payload: { content }
    }
}
