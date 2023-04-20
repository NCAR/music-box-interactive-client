import utils from '../utils';
import { run } from '../../controllers/api'

export const doRun = (config) => async (dispatch) => {
  try {
    await run(config);
    dispatch({ type: utils.action_types.RUN_STARTED, payload: {} });
  } catch (error) {
    console.error(`Error starting run: ${error.message}`);
  }
};
