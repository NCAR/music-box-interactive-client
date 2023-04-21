import utils from '../utils';

export const updateBasicConfiguration = (content) => {
    return {
        type: utils.action_types.UPDATE_BASIC_CONFIGURATION,
        payload: { content }
    }
}
