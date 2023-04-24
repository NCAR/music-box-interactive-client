import utils from '../utils';
import { run } from '../../controllers/api'
import { translate_to_camp_config } from '../../controllers/transformers'

export const doRun = (config) => async (dispatch) => {
  try {
    await run(translate_to_camp_config(config));
    dispatch({ type: utils.action_types.START_POLLING, payload: {} });
  } catch (error) {
    console.error(`Error starting run: ${error.message}`);
  }
};
