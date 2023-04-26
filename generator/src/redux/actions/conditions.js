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

export const updateEvolvingConditions = content => {
    return {
        type: utils.action_types.UPDATE_EVOLVING_CONDITIONS,
        payload: { content }
    }
}

export const updateEvolvingTime = content => {
    return {
        type: utils.action_types.UPDATE_EVOLVING_TIME,
        payload: { content }
    }
}

export const updateEvolvingConditionValue = content => {
    return {
        type: utils.action_types.UPDATE_EVOLVING_CONDITION_VALUE,
        payload: { content }
    }
}

export const resortEvolvingConditions = content => {
    return {
        type: utils.action_types.RESORT_EVOLVING_CONDITIONS,
        payload: { content }
    }
}

export const addEvolvingCondition = content => {
    return {
        type: utils.action_types.ADD_EVOLVING_CONDITION,
        payload: { content }
    }
}

export const addEvolvingTime = content => {
    return {
        type: utils.action_types.ADD_EVOLVING_TIME,
        payload: { content }
    }
}
