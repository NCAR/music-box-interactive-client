import utils from '../utils';

export const addGasSpecies = (content) => {
    return {
        type: utils.action_types.ADD_GAS_SPECIES,
        payload: { content }
    }
}

export const removeGasSpecies = (content) => {
    return {
        type: utils.action_types.REMOVE_GAS_SPECIES,
        payload: { content }
    }
}

export const addProperty = (content) => {
    return {
        type: utils.action_types.ADD_PROPERTY,
        payload: { content }
    }
}

export const removeProperty = (content) => {
    return {
        type: utils.action_types.REMOVE_PROPERTY,
        payload: { content }
    }
}

export const changeReactionType = (reactionType) => {
    return {
        type: utils.action_types.CHANGE_REACTION_TYPE,
        payload: reactionType
    }
}

export const changeExistingSpecies = (speciesConfig) => {
    return {
        type: utils.action_types.CHANGE_EXISTING_SPECIES,
        payload: speciesConfig
    }
}

export const addNewSpecies = (speciesConfig) => {
    return {
        type: utils.action_types.ADD_NEW_SPECIES,
        payload: speciesConfig
    }
}