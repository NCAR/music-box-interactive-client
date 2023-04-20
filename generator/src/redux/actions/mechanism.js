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

export const addReaction = (content) => {
    return {
        type: utils.action_types.ADD_REACTION,
        payload: { content }
    }
}

export const updateReactionData = (content) => {
    return {
        type: utils.action_types.UPDATE_REACTION_DATA,
        payload: { content }
    }
}

export const removeReaction = (content) => {
    return {
        type: utils.action_types.REMOVE_REACTION,
        payload: { content }
    }
}

export const addReactant = (content) => {
    return {
        type: utils.action_types.ADD_REACTANT,
        payload: { content }
    }
}

export const removeReactant = (content) => {
    return {
        type: utils.action_types.REMOVE_REACTANT,
        payload: { content }
    }
}

export const addProduct = (content) => {
    return {
        type: utils.action_types.ADD_PRODUCT,
        payload: { content }
    }
}

export const removeProduct = (content) => {
    return {
        type: utils.action_types.REMOVE_PRODUCT,
        payload: { content }
    }
}
