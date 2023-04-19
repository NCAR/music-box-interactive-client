import utils from '../utils';

export const changeConditions = (conditionsConfig) => {
    return {
        type: utils.action_types.CHANGE_CONDITIONS,
        payload: conditionsConfig
    }
}